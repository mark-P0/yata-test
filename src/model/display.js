import { ModelIDs, SorterIDs } from './ids.js';
import Sorters from './sorters.js';
import { Task } from './tasks.js';
import { Events } from '../controller/pubsub.js';

const Display = (() => {
  let type = ModelIDs.TODO; // Hard-code for now
  let items = [];
  let sorter = null;
  let asDescending = false;

  const emit = () => {
    let toEmit = items.slice();
    Sorters[sorter](toEmit, asDescending);
    toEmit = toEmit.map((task) => Task.objectify(task));
    Events.EMIT_DISPLAY.publish(toEmit);
  };

  return {
    get type() {
      return type;
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
      sorter = newSorter;
      emit();
    },
  };
})();

Events.UPDATE_DISPLAY_ITEMS.subscribe((items) => {
  const { type, data } = items;
  if (type !== Display.type) return;

  Display.items = data;
});

Events.UPDATE_DISPLAY_SORTING.subscribe((sorterId) => {
  Display.sorter = sorterId;
});
