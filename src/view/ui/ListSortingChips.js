import { generateId } from 'src/model/id-generator.js';
import { E } from '../__dom__.js';
import { Events } from 'src/controller/pubsub.js';

const SortingChipRadio = (group, text, icon) => {
  let attributes;

  const id = generateId('HTML');
  attributes = { class: 'btn-check', type: 'radio', name: group, id };
  const input = E('input', attributes);

  attributes = {
    class:
      'position-absolute top-0 start-0 w-100 h-100 bg-white z-low rounded-pill',
  };
  const background = E('div', attributes);

  const bi = `bi-${icon} space-before`;
  attributes = {
    class: `${bi} position-relative btn btn-outline-dark border-none shadow-md rounded-pill fw-semibold fs-smaller text-nowrap`,
    for: id,
  };
  const label = E('label', attributes, text, [background]);

  return [input, label];
};

const ListSortingChips = () => {
  let attributes;

  const id = generateId('HTML');
  attributes = {
    class:
      'w-100 hstack gap-3 px-3 pt-3 py-2 overflow-auto scrollbar scrollbar-thin scrollbar-translucent',
    id,
  };
  /** @type {HTMLElement} */
  const chips = E('div', attributes, [
    ...SortingChipRadio(id, 'Creation', 'pencil-square'),
    ...SortingChipRadio(id, 'Priority', 'exclamation-square'),
    ...SortingChipRadio(id, 'Project', 'kanban'),
    ...SortingChipRadio(id, 'Due Date', 'calendar-event'),
  ]);

  Events.INITIALIZATION.subscribe(() => {
    chips.firstElementChild.click(); // Default radio group to first button
  });

  attributes = { class: 'position-absolute top-0 start-0' };
  const container = E('div', attributes, [
    E('div', { class: 'position-fixed vw-100' }, [chips]),
  ]);

  return container;
};

export default ListSortingChips();
