import { ModalID, ModalFormTypes } from './Modal.js';
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
    'data-bs-target': '#' + ModalID,
  };
  const button = E('button', attributes);
  button.addEventListener('click', () => {
    Events.UPDATE_MODAL.publish({
      formType: ModalFormTypes.CREATE,
    });
  });

  attributes = {
    class: 'position-absolute bottom-0 end-0 z-high',
    id: 'floating-button',
  };
  return E('div', attributes, [button]);
};

export default FloatingButton();
