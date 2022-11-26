import { TodoModalContentForm } from './ModalContentForms.js';
import { E } from '../__dom__.js';
import { Events } from 'src/controller/pubsub.js';

const Modal = () => {
  const dialog = E('div', { class: 'modal-dialog' });
  Events.CREATE_TODO_FORM.subscribe(() => {
    dialog.replaceChildren(TodoModalContentForm('Create a New Todo', 'Create'));
  });
  Events.UPDATE_TODO_FORM.subscribe((values) => {
    dialog.replaceChildren(
      TodoModalContentForm('Update Todo', 'Update', values)
    );
  });

  return E('div', { class: 'modal fade', id: 'modal' }, [dialog]);
};

export default Modal();
