import { InstanceIDs, ModelIDs, PriorityIDs, TaskParameterIDs } from 'src/model/ids.js'; // prettier-ignore
import { TaskDate } from 'src/model/task-dates.js';
import PriorityColors from './priority-colors.js';
import { E } from '../__dom__.js';
import { Events } from 'src/controller/pubsub.js';

const mapTaskTypeTexts = {
  [ModelIDs.TODO]: 'Todo',
  [ModelIDs.PROJECT]: 'Project',
};
const CurrentTask = {
  type: undefined,
  get typeText() {
    return mapTaskTypeTexts[this.type];
  },
  id: undefined,
};
const ModalFormTypes = /** @type {const} */ ({
  CREATE: 'CreatingModalForm',
  UPDATE: 'UpdatingModalForm',
});
/* prettier-ignore */
const mapFormTypeData = {
  [ModalFormTypes.CREATE]: { title: () => `Create a New ${CurrentTask.typeText}`, button: 'Create', event: Events.CREATE_TASK },
  [ModalFormTypes.UPDATE]: { title: () => `Edit a ${CurrentTask.typeText}`,       button: 'Update', event: Events.UPDATE_TASK },
};
/** @type {typeof ModalFormTypes[keyof typeof ModalFormTypes]} */
let ModalFormType;

const ModalTitle = E('h1', { class: 'fw-semibold' }, /* Text set dynamically */ ); // prettier-ignore
const ModalCloser = E('button', { type: 'button', class: 'btn-close', 'aria-label': 'Close modal', 'data-bs-dismiss': 'modal' }); // prettier-ignore

const ModalFormRadioButton = (name, value, text) => {
  let attributes;

  const id = InstanceIDs.generate('HTML');
  attributes = { type: 'radio', class: 'btn-check', name, id, value };
  const input = E('input', attributes);

  const hue = PriorityColors[value];
  const label = E('label', text, {
    class: 'priority btn text-truncate',
    for: id,
    style: `--hue: ${hue};`,
  });

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
  [TaskParameterIDs.PARENT]: (() => {
    const id = InstanceIDs.generate('HTML');
    const label = E('label', { class: 'form-label mb-1', for: id }, 'Project');

    const defaultOption = E('option', { value: '' }, 'No project association');
    const input = E('select', { class: 'form-select mb-2', id, name: TaskParameterIDs.PARENT }, [defaultOption]);

    Events.UPDATE_DISPLAY_ITEMS.subscribe(({ type, data }) => {
      if (type !== ModelIDs.PROJECT) return;
      input.replaceChildren(
        defaultOption,
        ...data.map(({id, title}) => E('option', { value: id }, title)),
      );
    });

    return { label, input };
  })(),
};
function setDefaultControlValue(taskParamId, value) {
  const { input } = mapTaskParamControls[taskParamId];
  input.setAttribute('value', value);
}
function setDefaultSelectionValue(parentId) {
  const { input } = mapTaskParamControls[TaskParameterIDs.PARENT];
  for (const option of input.children) {
    option.removeAttribute('selected');
    if (option.getAttribute('value') === parentId) {
      option.setAttribute('selected', true);
    }
  }
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

Events.UPDATE_DISPLAY_TYPE.subscribe((type) => {
  if (CurrentTask.type !== type) {
    ModalForm.reset();
  }
  CurrentTask.type = type;
});

Events.UPDATE_MODAL.subscribe((data) => {
  ModalFormType = data.formType;
  ModalTitle.textContent = mapFormTypeData[ModalFormType].title();
  ModalFormSubmitButton.textContent = mapFormTypeData[ModalFormType].button;

  {
    /* Hide selection input based on current task type */
    const { label, input } = mapTaskParamControls[TaskParameterIDs.PARENT];
    if (CurrentTask.type === ModelIDs.TODO) {
      label.classList.remove('d-none');
      input.classList.remove('d-none');
    } else {
      label.classList.add('d-none');
      input.classList.add('d-none');
    }
  }

  {
    /* Selectively modify modal elements based on modal type */
    const { TITLE, DESCRIPTION, DUE_DATE, PRIORITY, PARENT } = TaskParameterIDs;
    if (ModalFormType === ModalFormTypes.CREATE) {
      CurrentTask.id = undefined;
      setDefaultControlValue(TITLE, '');
      setDefaultControlValue(DESCRIPTION, '');
      setDefaultControlValue(DUE_DATE, TaskDate.current.date);
      setDefaultRadioButton(PriorityIDs.NONE);
      setDefaultSelectionValue('');
    } else if (ModalFormType === ModalFormTypes.UPDATE) {
      CurrentTask.id = data.id;
      setDefaultControlValue(TITLE, data[TITLE]);
      setDefaultControlValue(DESCRIPTION, data[DESCRIPTION]);
      setDefaultControlValue(DUE_DATE, data[DUE_DATE]);
      setDefaultRadioButton(data[PRIORITY]);
      setDefaultSelectionValue(data[PARENT]);
    }
  }
});

export default Modal;
export { ModalID, ModalFormTypes };
