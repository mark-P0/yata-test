import { SorterIDs } from './ids.js';
import Sorters from './sorters.js';
import { Task } from './tasks.js';
import { Events } from '../controller/pubsub.js';
import Filters from './filters.js';

const Display = (() => {
  /* Most will be initialized to proper values dynamically */
  let type;
  let items = [];
  let sorter;
  let asDescending = false;
  let filter;
  let filterValue;

  const emit = () => {
    let toEmit = items.slice();
    if (filter) toEmit = Filters[filter](toEmit, filterValue);
    toEmit = Sorters[sorter](toEmit, asDescending);
    toEmit = toEmit.map((task) => Task.objectify(task));
    Events.EMIT_DISPLAY.publish(toEmit);
  };

  return {
    get type() {
      return type;
    },
    set type(newType) {
      type = newType;
      Events.READ_TASK_LIST.publish(type);
    },

    get items() {
      return items;
    },
    set items(newItems) {
      items = newItems;
      /* Store display list as sorted by creation date */
      Sorters[SorterIDs.CREATION_DATE](items);
      emit();
    },

    get sorter() {
      return sorter;
    },
    set sorter(newSorter) {
      if (sorter === newSorter) asDescending = !asDescending;
      else asDescending = false;
      sorter = newSorter;
      emit();
    },

    get filter() {
      return filter;
    },
    set filter({ filterId, value }) {
      filter = filterId;
      filterValue = value;
      emit();
    },
  };
})();

Events.UPDATE_DISPLAY_TYPE.subscribe((newType) => {
  Display.type = newType;
});

Events.UPDATE_DISPLAY_ITEMS.subscribe((items) => {
  const { type, data } = items;
  if (type !== Display.type) return;

  Display.items = data;
});

Events.UPDATE_DISPLAY_SORTING.subscribe((sorterId) => {
  Display.sorter = sorterId;
});

Events.UPDATE_DISPLAY_FILTER.subscribe(({ filterId, value }) => {
  Display.filter = { filterId, value };
});
