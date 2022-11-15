import { NewTodoModalContentForm } from './ModalContents.js';
import { E, buildTree } from '../__dom__.js';

const Modal = () => {
  const dialog = E('div', { class: 'modal-dialog' }, [
    E(NewTodoModalContentForm),
  ]);
  const modal = E('div', { class: 'modal fade', id: 'modal' }, [dialog]);
  return modal;
};

export default buildTree(Modal());
