import { InstanceIDs, ModelIDs } from 'src/model/ids.js';
import { E } from '../__dom__.js';
import { Events } from 'src/controller/pubsub.js';

const ListToggleLabel = (elementId) => {
  const category = E('span', { class: 'fw-light text-uppercase' });
  const value = E('span', { class: 'fw-bold' });
  const label = E('label', [category, value], {
    class:
      'navbar-toggler border-none mx-3 flex-grow-1 text-truncate text-light text-center fs-larger user-select-none',
    for: elementId,
  });

  Events.UPDATE_LABEL_TEXT.subscribe((text) => {
    category.textContent = text.category ? `${text.category}: ` : '';
    value.textContent = text.value;
  });

  return label;
};

const ListToggle = (group, value, text, isDefault = false) => {
  let attributes;

  const id = InstanceIDs.generate('HTML');
  attributes = { class: 'btn-check', type: 'radio', name: group, id, value };
  const input = E('input', attributes);

  input.addEventListener('click', () => {
    Events.UPDATE_LABEL_TEXT.publish({ value: `All ${text}` });
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

const ListTogglesContainerID = InstanceIDs.generate('HTML');
const ListToggles = E(
  'div',
  { class: 'collapse navbar-collapse w-100', id: ListTogglesContainerID },
  [
    E('div', { class: 'text-white vstack gap-3' }, [
      ...ListToggle(ListTogglesContainerID, ModelIDs.TODO, 'Todos', true),
      ...ListToggle(ListTogglesContainerID, ModelIDs.PROJECT, 'Projects'),
    ]),
  ]
);

export default ListToggles;
export { ListTogglesContainerID, ListToggleLabel };
