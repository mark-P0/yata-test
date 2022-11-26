import { ModelIDs, PriorityIDs, TaskParameterIDs } from 'src/model/ids.js';
import { TaskDate } from 'src/model/task-dates.js';
import { FormLabel, FormInput, FormButtonGroup } from './FormElements.js';
import { ListToggleData } from './ListToggles.js';
import { ModalContent } from './ModalContents.js';
import { E } from '../__dom__.js';
import { Events } from 'src/controller/pubsub.js';

const TodoModalContentForm = (title, buttonSubmitText, values) => {
  values ??= {
    id: null,
    [TaskParameterIDs.TITLE]: '',
    [TaskParameterIDs.DESCRIPTION]: '',
    [TaskParameterIDs.DUE_DATE]: TaskDate.current.date,
    [TaskParameterIDs.PRIORITY]: PriorityIDs.NONE,
  };

  /* prettier-ignore */
  const controls = [
    {
      label: 'Title',
      input: FormInput(TaskParameterIDs.TITLE, { type: 'text', value: values[TaskParameterIDs.TITLE], required: true, autofocus: true }),
    }, {
      label: 'Description',
      input: FormInput(TaskParameterIDs.DESCRIPTION, { type: 'text', value: values[TaskParameterIDs.DESCRIPTION] }),
    }, {
      label: 'Due Date',
      input: FormInput(TaskParameterIDs.DUE_DATE, { type: 'date', value: values[TaskParameterIDs.DUE_DATE] }),
    }, {
      label: 'Priority',
      input: FormButtonGroup(TaskParameterIDs.PRIORITY, 'radio', [
        { value: PriorityIDs.NONE, text: 'None' },
        { value: PriorityIDs.LOW, text: 'Low' },
        { value: PriorityIDs.MID, text: 'Mid' },
        { value: PriorityIDs.HIGH, text: 'High' },
        { value: PriorityIDs.URGENT, text: 'Urgent' },
      ], values[TaskParameterIDs.PRIORITY]),
    }, {
      label: null,
      input: E('div', { class: 'hstack flex-maximize gap-3 mt-2' }, [
        E('button', 'Reset', { type: 'reset', class: 'btn btn-outline-danger', 'aria-label': 'Reset form' }),
        E('button', buttonSubmitText, { type: 'submit', class: 'btn btn-dark', 'aria-label': title }),
      ])
    }
  ];
  const form = E(
    'form',
    { method: 'dialog', class: 'vstack gap-2' },
    controls.map((control) => FormLabel(control.label, control.input))
  );

  /*  Auto-focus to the corresponding input element.
   *  The `autofocus` attribute, if present, will not actually do anything meaningful.
   *  It auto-focuses to the attribute "on page load".
   *  The intention here is to focus on the input "when the modal is shown".
   *  This "technique" is also outlined on Bootstrap's docs.
   *  https://getbootstrap.com/docs/5.2/components/modal/#how-it-works
   */
  document.addEventListener('shown.bs.modal', () => controls[0].input.focus());

  const toggleId = ListToggleData.TODO_LIST.id;
  const modalContent = ModalContent(toggleId, title, [form]);
  const closer = modalContent.querySelector('.btn-close');
  form.addEventListener('submit', () => {
    const formData = new FormData(form);
    const todoProps = Object.fromEntries(formData);

    const { id } = values;
    if (!id) {
      Events.CREATE_TASK.publish({ type: ModelIDs.TODO, data: todoProps });
    } else {
      Events.UPDATE_TASK.publish({ type: ModelIDs.TODO, data: todoProps, id });
    }

    closer.click();
    form.reset();
  });
  return modalContent;
};

export { TodoModalContentForm };
