import Utilities from '../../scripts/utilities.js';
import { ModelIDs } from 'src/model/ids.js';
import { E } from '../__dom__.js';
import { Events } from '../../controller/pubsub.js';

const TodoCardDelete = (id) => {
  const element = E('button', {
    type: 'button',
    'aria-label': 'Delete todo',
    class: 'btn-close',
  });

  const listener = () => {
    Events.DELETE_TASK.publish({
      type: ModelIDs.TODO,
      id,
    });
  };
  element.addEventListener('click', listener, { once: true });

  return element;
};

const TodoCardBody = (id, title, description) => {
  const heading = E(
    'div',
    { class: 'hstack justify-content-between align-items-start' },
    [E('h5', { class: 'card-title fw-semibold' }, title), TodoCardDelete(id)]
  );

  const text = E('p', { class: 'card-text' }, description);
  return E('div', { class: 'card-body' }, [heading, text]);
};

const TodoCardFooter = (dueDate) => {
  const attributes = {
    class: 'card-footer bg-white text-secondary text-end fs-smaller',
  };
  return E('div', attributes, [E('#text', 'Due on '), E('strong', dueDate)]);
};

const TodoCard = (todo) => {
  const { id, title, description, dueDate, priority } = todo;

  const card = E('section', { class: 'card shadow text-dark' }, [
    TodoCardBody(id, title, description),
    TodoCardFooter(dueDate),
  ]);

  const priorityRev = Utilities.reverse(priority, [0, 6]);
  const hue = Utilities.translate(priorityRev, [0, 6], [0, 240]);
  card.style.setProperty('--hint-hue', hue);

  return card;
};

export default TodoCard;
