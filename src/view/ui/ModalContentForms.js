import { ModelIDs, PriorityIDs } from 'src/model/ids.js';
import { TaskDate } from 'src/model/task-dates.js';
import { FormLabel, FormInput, FormButtonGroup } from './FormElements.js';
import { ListToggleData } from './ListToggles.js';
import { ModalContent } from './ModalContents.js';
import { E } from '../__dom__.js';
import { Events } from 'src/controller/pubsub.js';

const TodoModalContentForm = () => {
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
};

export { TodoModalContentForm };
