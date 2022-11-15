import { Events } from '../../controller/pubsub.js';

const modalContent = document.querySelector(
  '.modal [data-for-toggle=todo-toggle]'
);
const modalCloser = modalContent.querySelector('.btn-close');
const TodoForm = modalContent.querySelector('form');

TodoForm.addEventListener('submit', () => {
  const formData = new FormData(TodoForm);
  const todoProps = Object.fromEntries(formData);

  Events.CREATE_TODO.publish(todoProps);
  modalCloser.click();
  TodoForm.reset();
});
