import { E } from '../__dom__.js';

const FormLabelRequiredHint = E('span', { class: 'text-danger fw-bold' }, '*');
const FormLabel = (label, nestedElements) => {
  const children = [E('#text', label)];
  children.push(...nestedElements);

  return E('label', { class: 'form-label' }, children);
};

const FormInput = (name, attributes, isFocusDefault = false) => {
  const element = E('input', { class: 'form-control', name, ...attributes });

  if (isFocusDefault) {
    document.addEventListener('shown.bs.modal', () => {
      element.focus();
    });
  }

  return element;
};

export { FormLabelRequiredHint, FormLabel, FormInput };
