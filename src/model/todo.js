import { Events } from '../controller/pubsub.js';

class Todo {
  id;
  type;
  title;
  description;
  dueDate;
  priority;

  constructor(title, description, dueDate, priority) {
    this.id = crypto.randomUUID();
    this.type = this.constructor.name;

    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = Number.parseInt(priority) || 0;
  }
}

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

Events.REFRESH_TODO_LIST.subscribe((storedList) => {
  if (storedList) TodoList.set(storedList);
  Events.UPDATE_TODO_LIST.publish(TodoList.items);
});
Events.CREATE_TODO.subscribe((data) => {
  const args = Object.values(data);
  const todo = new Todo(...args);

  TodoList.add(todo);
  Events.UPDATE_TODO_LIST.publish(TodoList.items);
});
Events.DELETE_TODO.subscribe((todoId) => {
  TodoList.remove(todoId);
  Events.UPDATE_TODO_LIST.publish(TodoList.items);
});
