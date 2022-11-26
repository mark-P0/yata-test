import { E } from '../__dom__.js';
import { Events } from 'src/controller/pubsub.js';

const FloatingButton = () => {
  let attributes;

  attributes = {
    type: 'button',
    class:
      'bi-plus-lg position-fixed translate-middle btn btn-dark rounded-circle flex-center shadow',
    'aria-label': 'Open modal',
    'data-bs-toggle': 'modal',
    'data-bs-target': '#modal',
  };
  const button = E('button', attributes);
  button.addEventListener('click', () => {
    Events.CREATE_TODO_FORM.publish(null);
  });

  attributes = {
    class: 'position-absolute bottom-0 end-0',
    id: 'floating-button',
  };
  return E('div', attributes, [button]);
};

export default FloatingButton();
