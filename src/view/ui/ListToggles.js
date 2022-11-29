import { InstanceIDs, ModelIDs } from 'src/model/ids.js';
import { E } from '../__dom__.js';
import { Events } from 'src/controller/pubsub.js';

const ListToggle = (group, value, text, isDefault = false) => {
  let attributes;

  const id = InstanceIDs.generate('HTML');
  attributes = { class: 'btn-check', type: 'radio', name: group, id, value };
  const input = E('input', attributes);

  input.addEventListener('click', () => {
    Events.UPDATE_DISPLAY_FILTER.publish({ filterId: null });
    Events.UPDATE_DISPLAY_TYPE.publish(value);
  });
  if (isDefault) {
    Events.INITIALIZATION.subscribe(() => {
      input.click();
    });
  }

  attributes = { class: 'btn btn-outline-light rounded-pill fw-bold', for: id };
  const label = E('label', attributes, text);

  return [input, label];
};

const ListToggles = () => {
  let attributes, children;

  const id = InstanceIDs.generate('HTML');
  attributes = { class: 'bg-dark text-white vstack gap-3 p-3', id };
  children = [
    ...ListToggle(id, ModelIDs.TODO, 'Todos', true),
    ...ListToggle(id, ModelIDs.PROJECT, 'Projects'),
  ];

  return E('aside', attributes, children);
};

export default ListToggles();
