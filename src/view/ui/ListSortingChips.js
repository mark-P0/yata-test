import { InstanceIDs, SorterIDs } from 'src/model/ids.js';
import { E } from '../__dom__.js';
import { Events } from 'src/controller/pubsub.js';

const SortingChipRadio = (group, value, text, icon, isDefault = false) => {
  let attributes;

  const id = InstanceIDs.generate('HTML');
  attributes = { class: 'btn-check', type: 'radio', name: group, id, value };
  const input = E('input', attributes);

  attributes = {
    class:
      'position-absolute top-0 start-0 w-100 h-100 bg-white z-low rounded-pill',
  };
  const background = E('div', attributes);

  attributes = {
    class: `${icon} space-before position-relative btn btn-outline-dark border-none shadow-md rounded-pill fw-semibold fs-smaller text-nowrap`,
    for: id,
  };
  const label = E('label', attributes, text, [background]);

  input.addEventListener('click', () => {
    Events.UPDATE_DISPLAY_SORTING.publish(value);
  });
  if (isDefault) {
    Events.INITIALIZATION.subscribe(() => {
      input.click();
    });
  }

  return [input, label];
};

const ListSortingChips = () => {
  let attributes;

  const id = InstanceIDs.generate('HTML');
  attributes = {
    class:
      'w-100 hstack gap-3 p-3 pe-4 overflow-auto scrollbar scrollbar-thin scrollbar-translucent',
    id,
  };
  /* prettier-ignore */
  const chips = E('div', attributes, [
    ...SortingChipRadio(id, SorterIDs.CREATION_DATE, 'Creation', 'bi-pencil-square', true),
    ...SortingChipRadio(id, SorterIDs.PRIORITY, 'Priority', 'bi-exclamation-square'),
    ...SortingChipRadio(id, SorterIDs.DUE_DATE, 'Due Date', 'bi-calendar-event'),
  ]);

  attributes = { class: 'position-absolute top-0 start-0 z-high' };
  const container = E('div', attributes, [
    E('div', { class: 'position-fixed vw-100' }, [chips]),
  ]);

  return container;
};

export default ListSortingChips();
