import { ModelIDs, PriorityIDs } from 'src/model/ids.js';
import { TaskDate } from 'src/model/task-dates.js';
import { FormLabel, FormInput, FormButtonGroup } from './Forms.js';
import { ListToggleData } from './ListToggles.js';
import { E } from '../__dom__.js';
import { Events } from 'src/controller/pubsub.js';

const ModalContentHeader = (title) => {
  const heading = E('h1', { class: 'fw-semibold' }, title);
  const closer = E('button', {
    type: 'button',
    class: 'btn-close',
    'aria-label': 'Close modal',
    'data-bs-dismiss': 'modal',
  });

  return E('div', { class: 'modal-header' }, [heading, closer]);
};

const ModalContentBody = (elements) => {
  return E('div', { class: 'modal-body' }, elements);
};

const ModalContent = (toggleId, title, elements) => {
  const attributes = {
    class: 'modal-content',
    'data-for-toggle': toggleId,
  };
  const children = [ModalContentHeader(title), ModalContentBody(elements)];

  return E('div', attributes, children);
};

const NewTodoModalContentForm = (() => {
  const title = 'Create a New Todo';
  const currentDate = TaskDate.current.date;

  /* prettier-ignore */
  const defaultFocusInput = FormInput('title', { type: 'text', required: true, autofocus: true })
  const description = FormInput('description', { type: 'text' });
  const dueDate = FormInput('dueDate', { type: 'date', value: currentDate });
  const priority = FormButtonGroup('priority', 'radio', [
    { value: PriorityIDs.NONE, text: 'None' },
    { value: PriorityIDs.LOW, text: 'Low' },
    { value: PriorityIDs.MID, text: 'Mid' },
    { value: PriorityIDs.HIGH, text: 'High' },
    { value: PriorityIDs.URGENT, text: 'Urgent' },
  ]);
  /* prettier-ignore */
  const buttons = E('div', { class: 'hstack flex-maximize gap-3 mt-2' }, [
    E('button', 'Reset', { type: 'reset', class: 'btn btn-outline-danger', 'aria-label': 'Reset form' }),
    E('button', 'Create', { type: 'submit', class: 'btn btn-dark', 'aria-label': title }),
  ]);
  const form = E('form', { method: 'dialog', class: 'vstack gap-2' }, [
    FormLabel('Title', [defaultFocusInput], true),
    FormLabel('Description', [description]),
    FormLabel('Due Date', [dueDate]),
    FormLabel('Priority', [priority]),
    buttons,
  ]);

  /*  Auto-focus to the corresponding input element.
   *  The `autofocus` attribute, if present, will not actually do anything meaningful.
   *  It auto-focuses to the attribute "on page load".
   *  The intention here is to focus on the input "when the modal is shown".
   *  This "technique" is also outlined on Bootstrap's docs.
   *  https://getbootstrap.com/docs/5.2/components/modal/#how-it-works
   */
  document.addEventListener('shown.bs.modal', () => defaultFocusInput.focus());

  const toggleId = ListToggleData.TODO_LIST.id;
  const modalContent = ModalContent(toggleId, title, [form]);
  const closer = modalContent.querySelector('.btn-close');
  form.addEventListener('submit', () => {
    const formData = new FormData(form);
    const todoProps = Object.fromEntries(formData);

    Events.CREATE_TASK.publish({
      type: ModelIDs.TODO,
      data: todoProps,
    });
    closer.click();
    form.reset();
  });
  return modalContent;
})();

export { NewTodoModalContentForm };
