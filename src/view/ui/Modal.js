import { InstanceIDs, ModelIDs, PriorityIDs, TaskParameterIDs } from 'src/model/ids.js'; // prettier-ignore
import { TaskDate } from 'src/model/task-dates.js';
import PriorityColors from './priority-colors.js';
import { E } from '../__dom__.js';
import { Events } from 'src/controller/pubsub.js';

const ModalFormTypes = /** @type {const} */ ({
  CREATE: 'CreatingModalForm',
  UPDATE: 'UpdatingModalForm',
});
/* TODO: Set task type text dynamically? */
/* prettier-ignore */
const mapFormTypeData = {
  [ModalFormTypes.CREATE]: { title: 'Create a New Todo', button: 'Create', event: Events.CREATE_TASK },
  [ModalFormTypes.UPDATE]: { title: 'Edit a Todo', button: 'Update', event: Events.UPDATE_TASK },
};
/** @type {typeof ModalFormTypes[keyof typeof ModalFormTypes]} */
let ModalFormType;
let CurrentTask = {
  type: ModelIDs.TODO,
  id: undefined,
};

const ModalTitle = E('h1', { class: 'fw-semibold' }, /* Text set dynamically */ ); // prettier-ignore
const ModalCloser = E('button', {
  type: 'button',
  class: 'btn-close',
  'aria-label': 'Close modal',
  'data-bs-dismiss': 'modal',
});

const ModalFormRadioButton = (name, value, text) => {
  let attributes;

  const id = InstanceIDs.generate('HTML');
  attributes = { type: 'radio', class: 'btn-check', name, id, value };
  const input = E('input', attributes);

  const hue = PriorityColors[value];
  attributes = { class: 'priority btn', for: id, style: `--hue: ${hue};` };
  const label = E('label', attributes, text);

  return { input, label };
};
/* prettier-ignore */
const mapPriorityRadioButtons = {
  [PriorityIDs.NONE]: ModalFormRadioButton(TaskParameterIDs.PRIORITY, PriorityIDs.NONE, 'None'),
  [PriorityIDs.LOW]: ModalFormRadioButton(TaskParameterIDs.PRIORITY, PriorityIDs.LOW, 'Low'),
  [PriorityIDs.MID]: ModalFormRadioButton(TaskParameterIDs.PRIORITY, PriorityIDs.MID, 'Mid'),
  [PriorityIDs.HIGH]: ModalFormRadioButton(TaskParameterIDs.PRIORITY, PriorityIDs.HIGH, 'High'),
  [PriorityIDs.URGENT]: ModalFormRadioButton(TaskParameterIDs.PRIORITY, PriorityIDs.URGENT, 'Urgent'),
};
function setDefaultRadioButton(priorityId) {
  const buttons = Object.values(mapPriorityRadioButtons);
  for (const { input } of buttons) input.removeAttribute('checked');
  mapPriorityRadioButtons[priorityId].input.setAttribute('checked', true);
}

/* prettier-ignore */
const mapTaskParamControls = {
  [TaskParameterIDs.TITLE]: (() => {
    const id = InstanceIDs.generate('HTML');
    const label = E('label', { class: 'form-label mb-1', for: id }, 'Title', [
      E('span', { class: 'text-danger fw-bold' }, '*')
    ]);
    const input = E('input', { class: 'form-control mb-2', id, name: TaskParameterIDs.TITLE, type: 'text', required: true, autofocus: true });
    return { label, input };
  })(),
  [TaskParameterIDs.DESCRIPTION]: (() => {
    const id = InstanceIDs.generate('HTML');
    const label = E('label', { class: 'form-label mb-1', for: id }, 'Description');
    const input = E('input', { class: 'form-control mb-2', id, name: TaskParameterIDs.DESCRIPTION, type: 'text' });
    return { label, input };
  })(),
  [TaskParameterIDs.DUE_DATE]: (() => {
    const id = InstanceIDs.generate('HTML');
    const label = E('label', { class: 'form-label mb-1', for: id }, 'Due Date');
    const input = E('input', { class: 'form-control mb-2', id, name: TaskParameterIDs.DUE_DATE, type: 'date' });
    return { label, input };
  })(),
  [TaskParameterIDs.PRIORITY]: (() => {
    const id = InstanceIDs.generate('HTML');
    const label = E('label', { class: 'form-label mb-1', for: id }, 'Priority');
    const input = E('div', { class: 'btn-group mb-2', id }, Object.values(mapPriorityRadioButtons).flatMap(Object.values));
    return { label, input };
  })(),
};
function setDefaultControlValue(taskParamId, value) {
  mapTaskParamControls[taskParamId].input.setAttribute('value', value);
}

const ModalFormResetButton = E('button', { type: 'reset', class: 'btn btn-outline-danger', 'aria-label': 'Reset form' }, 'Reset'); // prettier-ignore
const ModalFormSubmitButton = E('button', { type: 'submit', class: 'btn btn-dark', 'aria-label': 'Submit form' }, /* Text set dynamically */ ); // prettier-ignore
const ModalForm = E('form', { method: 'dialog', class: 'vstack' }, [
  ...Object.values(mapTaskParamControls).flatMap(Object.values),
  E('div', { class: 'hstack flex-maximize gap-3 mt-3' }, [ModalFormResetButton, ModalFormSubmitButton]), // prettier-ignore
]);
ModalForm.addEventListener('submit', () => {
  const data = Object.fromEntries(new FormData(ModalForm));
  const { type, id } = CurrentTask;
  mapFormTypeData[ModalFormType].event.publish({ type, data, id });

  ModalCloser.click();
  ModalForm.reset();
});

const ModalID = InstanceIDs.generate('HTML');
const Modal = E('div', { class: 'modal fade', id: ModalID }, [
  E('div', { class: 'modal-dialog' }, [
    E('div', { class: 'modal-content' }, [
      E('div', { class: 'modal-header' }, [ModalTitle, ModalCloser]),
      E('div', { class: 'modal-body' }, [ModalForm]),
    ]),
  ]),
]);

/*  Auto-focus to the corresponding input element.
 *  The `autofocus` attribute, if present, will not actually do anything meaningful.
 *  It auto-focuses to the attribute "on page load".
 *  The intention here is to focus on the input "when the modal is shown".
 *  This "technique" is also outlined on Bootstrap's docs.
 *  https://getbootstrap.com/docs/5.2/components/modal/#how-it-works
 */
Modal.addEventListener('shown.bs.modal', () => {
  mapTaskParamControls[TaskParameterIDs.TITLE].input.focus();
});

Events.UPDATE_MODAL.subscribe((data) => {
  ModalFormType = data.formType;
  ModalTitle.textContent = mapFormTypeData[ModalFormType].title;
  ModalFormSubmitButton.textContent = mapFormTypeData[ModalFormType].button;

  /* prettier-ignore */
  if (ModalFormType === ModalFormTypes.CREATE) {
    CurrentTask.id = undefined;
    setDefaultControlValue(TaskParameterIDs.TITLE,        '');
    setDefaultControlValue(TaskParameterIDs.DESCRIPTION,  '');
    setDefaultControlValue(TaskParameterIDs.DUE_DATE,     TaskDate.current.date);
    setDefaultRadioButton(PriorityIDs.NONE);
  }
  else if (ModalFormType === ModalFormTypes.UPDATE) {
    CurrentTask.id = data.id;
    setDefaultControlValue(TaskParameterIDs.TITLE,        data[TaskParameterIDs.TITLE]);
    setDefaultControlValue(TaskParameterIDs.DESCRIPTION,  data[TaskParameterIDs.DESCRIPTION]);
    setDefaultControlValue(TaskParameterIDs.DUE_DATE,     data[TaskParameterIDs.DUE_DATE]);
    setDefaultRadioButton(data[TaskParameterIDs.PRIORITY]);
  }
});

export default Modal;
export { ModalID, ModalFormTypes };
