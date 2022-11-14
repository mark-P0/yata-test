import TodoCard from './TodoCard.js';
import { Events } from '../../controller/pubsub.js';

const TodoList = document.querySelector('main [data-for-list=todo-list]');

Events.UPDATE_TODO_LIST.subscribe((todoList) => {
  const cards = todoList.map((todo) => TodoCard(todo));
  TodoList.replaceChildren(...cards);
});
