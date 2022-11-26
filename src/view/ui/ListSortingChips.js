import { InstanceIDs, SorterIDs } from 'src/model/ids.js';
import { E } from '../__dom__.js';
import { Events } from 'src/controller/pubsub.js';

const mapSorterData = {
  [SorterIDs.CREATION_DATE]: { text: 'Creation', icon: 'pencil-square' },
  [SorterIDs.PRIORITY]: { text: 'Priority', icon: 'exclamation-square' },
  [SorterIDs.PROJECT]: { text: 'Project', icon: 'kanban' },
  [SorterIDs.DUE_DATE]: { text: 'Due Date', icon: 'calendar-event' },
};

const SortingChipRadio = (group, sorterId) => {
  const { text, icon } = mapSorterData[sorterId];

  let attributes;

  const id = InstanceIDs.generate('HTML');
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

  input.addEventListener('click', () => {
    Events.UPDATE_DISPLAY_SORTING.publish(sorterId);
  });

  return [input, label];
};

const ListSortingChips = () => {
  let attributes;

  const id = InstanceIDs.generate('HTML');
  attributes = {
    class:
      'w-100 hstack gap-3 ps-3 pe-5 pt-3 py-2 overflow-auto scrollbar scrollbar-thin scrollbar-translucent',
    id,
  };
  /** @type {HTMLElement} */
  const chips = E('div', attributes, [
    ...SortingChipRadio(id, SorterIDs.CREATION_DATE),
    ...SortingChipRadio(id, SorterIDs.PRIORITY),
    // ...SortingChipRadio(id, SorterIDs.PROJECT),
    ...SortingChipRadio(id, SorterIDs.DUE_DATE),
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
