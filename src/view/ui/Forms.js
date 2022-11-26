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

export { FormLabel, FormInput };
