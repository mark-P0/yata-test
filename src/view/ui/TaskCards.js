import Utilities from '../../scripts/utilities.js';
import { ModelIDs } from 'src/model/ids.js';
import { E } from '../__dom__.js';
import { Events } from '../../controller/pubsub.js';

const TaskCardDelete = (id) => {
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

const TaskCardBody = (id, title, description) => {
  const heading = E(
    'div',
    { class: 'hstack justify-content-between align-items-start' },
    [E('h5', { class: 'card-title fw-semibold' }, title), TaskCardDelete(id)]
  );

  const text = E('p', { class: 'card-text' }, description);
  return E('div', { class: 'card-body' }, [heading, text]);
};

const TaskCardFooter = (dueDate) => {
  const attributes = {
    class: 'card-footer bg-white text-secondary text-end fs-smaller',
  };
  return E('div', attributes, [E('#text', 'Due on '), E('strong', dueDate)]);
};

const TaskCard = (todo) => {
  const { id, title, description, dueDate, priority } = todo;

  const card = E('section', { class: 'card shadow text-dark' }, [
    TaskCardBody(id, title, description),
    TaskCardFooter(dueDate),
  ]);

  const priorityRev = Utilities.reverse(priority, [0, 6]);
  const hue = Utilities.translate(priorityRev, [0, 6], [0, 240]);
  card.style.setProperty('--hint-hue', hue);

  return card;
};

export { TaskCard };
