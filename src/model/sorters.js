import { SorterIDs } from './ids.js';
import { Task } from './tasks.js';

/** @type {{[key: string]: (displayItems: Task[]) => void}} */
const Sorters = {
  [SorterIDs.CREATION_DATE]: (displayItems, asDescending) => {
    displayItems.sort(
      (a, b) => (a.creationDate - b.creationDate) * (asDescending ? -1 : 1)
    );
  },
  [SorterIDs.PRIORITY]: (displayItems, asDescending) => {
    displayItems.sort(
      (a, b) => (b.priority - a.priority) * (asDescending ? -1 : 1)
    );
  },
  [SorterIDs.PROJECT]: (displayItems, asDescending) => {
    console.warn('Not yet been implemented yet!');
    displayItems;
  },
  [SorterIDs.DUE_DATE]: (displayItems, asDescending) => {
    displayItems.sort(
      (a, b) => (a.dueDate - b.dueDate) * (asDescending ? -1 : 1)
    );
  },
};

export default Sorters;
