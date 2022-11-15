import { Events } from '../controller/pubsub.js';
import IDGenerator from './id-generator.js';

const TodoID = IDGenerator();
const Todo = (title, description, dueDate, priority) => {
  const id = TodoID.next;
  Events.UPDATE_TODO_ID.publish(id);

  /* TODO: Parse date as an actual object */

  priority = Number.parseInt(priority) || 0;

  return {
    get id() {
      return id;
    },
    get title() {
      return title;
    },
    get description() {
      return description;
    },
    get dueDate() {
      return dueDate;
    },
    get priority() {
      return priority;
    },
  };
};

const TodoList = (() => {
  let list = [];

  const add = (todo) => {
    list.push(todo);
  };
  const remove = (todoId) => {
    const idx = list.findIndex((todo) => todo.id === todoId);
    if (idx === -1) return;
    list.splice(idx, 1);
  };
  const set = (storedList) => {
    list = storedList;
  };

  return {
    add,
    remove,
    set,

    get items() {
      list.slice();
      return [...list];
    },
  };
})();

Events.REFRESH_TODO_ID.subscribe((storedCount) => {
  if (storedCount) TodoID.set(storedCount);
});
Events.REFRESH_TODO_LIST.subscribe((storedList) => {
  if (storedList) TodoList.set(storedList);
  Events.UPDATE_TODO_LIST.publish(TodoList.items);
});
Events.CREATE_TODO.subscribe((data) => {
  const args = Object.values(data);
  const todo = Todo(...args);

  TodoList.add(todo);
  Events.UPDATE_TODO_LIST.publish(TodoList.items);
});
Events.DELETE_TODO.subscribe((todoId) => {
  TodoList.remove(todoId);
  Events.UPDATE_TODO_LIST.publish(TodoList.items);
});
