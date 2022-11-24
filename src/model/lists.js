import { Events } from '../controller/pubsub.js';

const TodoList = (() => {
  let list = {};

  return {
    add(todo) {
      list[todo.id] = todo;
      Events.UPDATE_TODO_LIST.publish(this.items);
    },

    remove(todoId) {
      delete list[todoId];
      Events.UPDATE_TODO_LIST.publish(this.items);
    },

    get items() {
      return Object.values(list);
    },
  };
})();

export { TodoList };
