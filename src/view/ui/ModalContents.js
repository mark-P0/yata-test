import { FormInput, FormLabel, FormLabelRequiredHint } from './Forms.js';
import { ListToggleData } from './ListToggles.js';
import { E } from '../__dom__.js';
import ModelIDs from 'src/model/model-ids.js';
import { Events } from '../../controller/pubsub.js';

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

function parseDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

const NewTodoModalContentForm = (() => {
  const title = 'Create a New Todo';
  const currentDate = parseDate(new Date());

  /* prettier-ignore */
  const form = E('form', { method: 'dialog', class: 'vstack' }, [
    FormLabel('Title', [
      FormLabelRequiredHint,
      FormInput('title', { type: 'text', required: true, autofocus: true }),
    ]),
    FormLabel('Description', [
      FormInput('description', { type: 'text' }),
    ]),
    FormLabel('Due Date', [
      FormInput('dueDate', { type: 'date', value: currentDate }),
    ]),
    FormLabel('Priority', [
      FormInput('priority', { type: 'number', value: '0', min: '0', max: '6' }),
    ]),
    E('button', 'Create', {
      type: 'submit',
      class: 'btn btn-dark mt-3',
      'aria-label': title,
    }),
  ]);

  const defaultFocusElement = form.querySelector('[autofocus]');
  if (defaultFocusElement) {
    /*  The `autofocus` attribute, if present, will not actually do anything meaningful.
     *  It auto-focuses to the attribute "on page load". The intention here is to focus on the input
     *  "when the modal is shown". This "technique" is also outlined on Bootstrap's docs.
     *  https://getbootstrap.com/docs/5.2/components/modal/#how-it-works
     */
    document.addEventListener('shown.bs.modal', () => {
      defaultFocusElement.focus();
    });
  }

  const toggleId = ListToggleData.TODO_LIST.id;
  const modalContent = ModalContent(toggleId, title, [form]);
  const closerElement = modalContent.querySelector('.btn-close');
  const formElement = modalContent.querySelector('form');

  formElement.addEventListener('submit', () => {
    const formData = new FormData(formElement);
    const todoProps = Object.fromEntries(formData);

    Events.CREATE_TASK.publish({
      type: ModelIDs.TODO,
      data: todoProps,
    });
    closerElement.click();
    formElement.reset();
  });

  return modalContent;
})();

export { NewTodoModalContentForm };
