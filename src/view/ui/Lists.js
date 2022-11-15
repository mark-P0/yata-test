import TodoCard from './TodoCard.js';
import { ListToggleData } from './ListToggles.js';
import { E, buildTree } from '../__dom__.js';
import { Events } from '../../controller/pubsub.js';

const List = (toggleId) => {
  const attributes = {
    class: 'd-grid gap-3 m-3',
    'data-for-toggle': toggleId,
  };
  return E('div', attributes);
};

const TodoList = (() => {
  const toggleId = ListToggleData.TODO_LIST.id;
  const list = buildTree(List(toggleId));

  Events.UPDATE_TODO_LIST.subscribe((todoList) => {
    const cards = todoList.map((todo) => TodoCard(todo));
    TodoList.replaceChildren(...cards);
  });

  return list;
})();

export { TodoList };
