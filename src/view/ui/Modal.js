import { NewTodoModalContentForm } from './ModalContents.js';
import { E } from '../__dom__.js';

const Modal = () => {
  return E('div', { class: 'modal fade', id: 'modal' }, [
    E('div', { class: 'modal-dialog' }, [NewTodoModalContentForm]),
  ]);
};

export default Modal();
