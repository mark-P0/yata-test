import { ModelIDs, SorterIDs } from './ids.js';
import Sorters from './sorters.js';
import { Task } from './tasks.js';
import { Events } from '../controller/pubsub.js';

const Display = (() => {
  let type = null; // Will be initialized to proper values
  let items = [];
  let sorter = null; // Will be initialized to proper values
  let asDescending = false;

  const emit = () => {
    let toEmit = items.slice();
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
