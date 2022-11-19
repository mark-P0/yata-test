import { E } from '../__dom__.js';

const Button = (text) => {
  const attributes = {
    type: 'button',
    class:
      'position-fixed translate-middle btn btn-dark rounded-circle flex-center shadow',
    'aria-label': 'Open modal',
    'data-bs-toggle': 'modal',
    'data-bs-target': '#modal',
  };

  return E('button', attributes, text);
};

const FloatingButton = () => {
  const attributes = {
    class: 'position-absolute bottom-0 end-0',
    id: 'floating-button',
  };

  return E('div', attributes, [Button('+')]);
};

export default FloatingButton();
