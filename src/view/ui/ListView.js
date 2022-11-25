import TodoCard from './TodoCard.js';
import { E } from '../__dom__.js';
import { Events } from 'src/controller/pubsub.js';

const ListView = () => {
  const element = E('div', { class: 'd-grid gap-3' });

  Events.EMIT_DISPLAY.subscribe((displayList) => {
    const cards = displayList.map((todo) => TodoCard(todo));
    element.replaceChildren(...cards);
  });

  return element;
};

export default ListView();
