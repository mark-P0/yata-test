import {
  FilterIDs,
  InstanceIDs,
  ModelIDs,
  TaskParameterIDs,
} from 'src/model/ids.js';
import PriorityColors from './priority-colors.js';
import { ModalID, ModalFormTypes } from './Modal.js';
import { E } from '../__dom__.js';
import { Events } from 'src/controller/pubsub.js';

const IconButton = (icon, label, attributes = {}) => {
  return E('button', {
    type: 'button',
    'aria-label': label,
    class: `bi-${icon} btn px-1 py-0 z-high`,
    ...attributes,
  });
};
const TaskCardEdit = (task) => {
  const element = IconButton('pen', 'Edit', {
    'data-bs-toggle': 'modal',
    'data-bs-target': '#' + ModalID,
  });
  element.addEventListener('click', () => {
    const { id, title, description, dueDate, priority, parent } = task;
    Events.UPDATE_MODAL.publish({
      formType: ModalFormTypes.UPDATE,
      id,
      [TaskParameterIDs.TITLE]: title,
      [TaskParameterIDs.DESCRIPTION]: description,
      [TaskParameterIDs.DUE_DATE]: dueDate,
      [TaskParameterIDs.PRIORITY]: priority,
      [TaskParameterIDs.PARENT]: parent,
    });
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

const TaskCardBodyHeading = (id, title, task) => {
  let attributes, children;
  attributes = {
    class: 'hstack justify-content-between gap-3 align-items-start',
  };
  children = [
    E('h5', { class: 'card-title fw-semibold text-break' }, title),
    E('div', { class: 'hstack gap-2 align-items-start' }, [
      TaskCardEdit(task),
      TaskCardDelete(id),
    ]),
  ];
  return E('div', attributes, children);
};
const TaskCardBody = (id, title, description, task) => {
  return E('div', { class: 'card-body' }, [
    TaskCardBodyHeading(id, title, task),
    E('p', { class: 'card-text' }, description),
  ]);
};

const TaskCardFooter = (dueDate) => {
  const attributes = {
    class: 'card-footer bg-white text-secondary text-end fs-smaller',
  };
  return E('div', attributes, [E('#text', 'Due on '), E('strong', dueDate)]);
};

const TaskCard = (task) => {
  const { id, title, description, dueDate, priority } = task;
  let attributes, children;

  children = [
    TaskCardBody(id, title, description, task),
    TaskCardFooter(dueDate),
  ];
  const type = InstanceIDs.extractPrefix(id);
  if (type === ModelIDs.PROJECT) {
    const clicker = E('button', {
      class: 'stretched-link btn border border-0 p-0',
    });
    clicker.addEventListener('click', () => {
      Events.UPDATE_DISPLAY_FILTER.publish({
        filterId: FilterIDs.PARENT,
        value: id,
      });
      Events.UPDATE_DISPLAY_TYPE.publish(ModelIDs.TODO);
    });
    children.unshift(clicker);
  }

  attributes = {
    class: 'priority card shadow text-dark',
    style: `--hue: ${PriorityColors[priority]};`,
  };
  const card = E('section', attributes, children);

  return card;
};

export { TaskCard };
