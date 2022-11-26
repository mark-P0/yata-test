import { TodoModalContentForm } from './ModalContentForms.js';
import { E } from '../__dom__.js';

const Modal = () => {
  return E('div', { class: 'modal fade', id: 'modal' }, [
    E('div', { class: 'modal-dialog' }, [TodoModalContentForm()]),
  ]);
};

export default Modal();
