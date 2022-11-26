import { InstanceIDs } from 'src/model/ids.js';
import PriorityColors from './priority-colors.js';
import { E } from '../__dom__.js';

const FormLabelRequiredHint = () =>
  E('span', { class: 'text-danger fw-bold' }, '*');
const FormLabel = (label, nestedElements, isRequired = false) => {
  let children;

  children = [];
  if (isRequired) children.push(FormLabelRequiredHint());
  const text = E('span', label, children);

  children = [text, ...nestedElements];
  return E('label', { class: 'form-label vstack gap-1' }, children);
};

const FormInput = (name, attributes) => {
  return E('input', { class: 'form-control', name, ...attributes });
};

const FormButtonGroup = (name, type, labels, defaultIdx = 0) => {
  let attributes, children;

  children = labels.flatMap(({ value, text }, idx) => {
    const id = InstanceIDs.generate('HTML');
    attributes = { type, class: 'btn-check', name, id, value };
    if (idx === defaultIdx) attributes.checked = true;
    const input = E('input', attributes);

    const hue = PriorityColors[value];
    attributes = { class: 'priority btn', for: id, style: `--hue: ${hue};` };
    const label = E('label', attributes, text);

    return [input, label];
  });

  return E('div', { class: 'btn-group' }, children);
};

export { FormLabel, FormInput, FormButtonGroup };
