import { InstanceIDs } from 'src/model/ids.js';
import PriorityColors from './priority-colors.js';
import { E } from '../__dom__.js';

const FormLabelRequiredHint = (char = '*') => {
  return E('span', { class: 'text-danger fw-bold' }, char);
};

const FormLabel = (label, control) => {
  if (label === null) return control;
  let children;

  children = control.getAttribute('required') ? [FormLabelRequiredHint()] : [];
  const text = E('span', label, children);

  return E('label', { class: 'form-label vstack gap-1' }, [text, control]);
};

const FormInput = (name, attributes) => {
  return E('input', { class: 'form-control', name, ...attributes });
};

const FormButtonGroup = (name, type, labels, defaultId) => {
  let attributes, children;

  children = labels.flatMap(({ value, text }, idx) => {
    const id = InstanceIDs.generate('HTML');
    attributes = { type, class: 'btn-check', name, id, value };
    if (defaultId === value) attributes.checked = true;
    const input = E('input', attributes);

    const hue = PriorityColors[value];
    attributes = { class: 'priority btn', for: id, style: `--hue: ${hue};` };
    const label = E('label', attributes, text);

    return [input, label];
  });

  return E('div', { class: 'btn-group' }, children);
};

export { FormLabel, FormInput, FormButtonGroup };
