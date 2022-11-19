import TodoCard from './TodoCard.js';
import { ListToggleData } from './ListToggles.js';
import { E } from '../__dom__.js';
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
  const list = List(toggleId);

  Events.UPDATE_TODO_LIST.subscribe((todoList) => {
    const cards = todoList.map((todo) => TodoCard(todo));
    list.replaceChildren(...cards);
  });

  return list;
})();

export { TodoList };
