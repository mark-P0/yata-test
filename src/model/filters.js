import { FilterIDs } from './ids.js';
import { Task } from './tasks.js';

/** @type {{[key: string]: (displayItems: Task[], value: any) => Task[]}} */
const Filters = {
  [FilterIDs.PARENT]: (displayItems, value) =>
    displayItems.filter((task) => task.parent === value),
};

export default Filters;
