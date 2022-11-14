import { E, buildTree } from './__dom__.js';
import { Events } from '../../controller/pubsub.js';
import Utilities from '../../utilities.js';

const TodoCardDelete = (id) => {
  const element = buildTree(
    E('button', { type: 'button', class: 'btn-close' })
  );

  const listener = () => {
    Events.DELETE_TODO.publish(id);
  };
  element.addEventListener('click', listener, { once: true });

  return element;
};

const TodoCardBody = (id, title, description) => {
  const heading = E(
    'div',
    { class: 'hstack justify-content-between align-items-start' },
    [E('h5', { class: 'card-title fw-semibold' }, title), E(TodoCardDelete(id))]
  );

  const text = E('p', { class: 'card-text' }, description);
  return E('div', { class: 'card-body' }, [heading, text]);
};

const TodoCardFooter = (dueDate) => {
  const text = E('span', { class: 'text-end w-100' }, [
    E('#text', 'Due on '),
    E('strong', dueDate),
  ]);

  const attrs = { class: 'card-footer hstack gap-3 bg-white text-secondary' };
  return E('div', attrs, [text]);
};

const TodoCard = (todo) => {
  const { id, title, description, dueDate, priority } = todo;

  const card = buildTree(
    E('section', { class: 'card text-dark' }, [
      TodoCardBody(id, title, description),
      TodoCardFooter(dueDate),
    ])
  );

  const priorityRev = Utilities.reverse(priority, [0, 6]);
  const hue = Utilities.translate(priorityRev, [0, 6], [0, 240]);
  card.style.setProperty('--hint-hue', hue);

  return card;
};

export default TodoCard;
