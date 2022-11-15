import { E, buildTree } from '../__dom__.js';

const ListToggle = (id, labelText, parentId, isChecked = false) => {
  let attributes;

  attributes = {
    type: 'radio',
    class: 'btn-check',
    name: parentId,
    id,
  };
  if (isChecked) Object.assign(attributes, { checked: true });
  const input = E('input', attributes);

  attributes = {
    class: 'btn btn-outline-light rounded-pill fw-bold',
    for: id,
  };
  const label = E('label', attributes, labelText);

  return [input, label];
};

const ListToggles = () => {
  const attributes = {
    class: 'bg-dark text-white vstack gap-3 p-3',
    id: 'list-toggles',
  };
  const children = [...ListToggle('todo-list', 'Todos', attributes.id, true)];

  return E('aside', attributes, children);
};

export default buildTree(ListToggles());
