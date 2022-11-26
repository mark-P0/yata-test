import { TaskParameterIDs } from 'src/model/ids.js';
import PriorityColors from './priority-colors.js';
import { E } from '../__dom__.js';
import { Events } from 'src/controller/pubsub.js';

const IconButton = (icon, label, attributes = {}) => {
  return E('button', {
    type: 'button',
    'aria-label': label,
    class: `bi-${icon} btn px-1 py-0`,
    ...attributes,
  });
};

const TaskCardEdit = (task) => {
  const element = IconButton('pen', 'Edit', {
    'data-bs-toggle': 'modal',
    'data-bs-target': '#modal',
  });
  element.addEventListener('click', () => {
    const { id, title, description, dueDate, priority } = task;
    const values = {
      id,
      [TaskParameterIDs.TITLE]: title,
      [TaskParameterIDs.DESCRIPTION]: description,
      [TaskParameterIDs.DUE_DATE]: dueDate,
      [TaskParameterIDs.PRIORITY]: priority,
    };
    Events.UPDATE_TODO_FORM.publish(values);
  });
  return element;
};

const TaskCardDelete = (id) => {
  const element = IconButton('trash3', 'Delete');
  const listener = () => {
    Events.DELETE_TASK.publish(id);
  };
  element.addEventListener('click', listener, { once: true });
  return element;
};

const TaskCardBody = (id, title, description, task) => {
  let attributes, children;

  attributes = {
    class: 'hstack justify-content-between gap-3 align-items-start',
  };
  children = [
    E('h5', { class: 'card-title fw-semibold' }, title),
    E('div', { class: 'hstack gap-2 align-items-start' }, [
      TaskCardEdit(task),
      TaskCardDelete(id),
    ]),
  ];
  const heading = E('div', attributes, children);

  const text = E('p', { class: 'card-text' }, description);
  return E('div', { class: 'card-body' }, [heading, text]);
};

const TaskCardFooter = (dueDate) => {
  const attributes = {
    class: 'card-footer bg-white text-secondary text-end fs-smaller',
  };
  return E('div', attributes, [E('#text', 'Due on '), E('strong', dueDate)]);
};

const TaskCard = (task) => {
  const { id, title, description, dueDate, priority } = task;

  const attributes = {
    class: 'priority card shadow text-dark',
    style: `--hue: ${PriorityColors[priority]};`,
  };
  const card = E('section', attributes, [
    TaskCardBody(id, title, description, task),
    TaskCardFooter(dueDate),
  ]);

  return card;
};

export { TaskCard };
