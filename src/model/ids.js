const separator = '_';
const InstanceIDs = {
  /** @type {(prefix: string) => string} */
  generate(prefix) {
    const uuid = crypto.randomUUID();
    return `${prefix}${separator}${uuid}`;
  },

  /** @type {(id: string) => string} */
  extractPrefix(id) {
    const [prefix, ..._] = id.split(separator);
    return prefix;
  },
};

const ModelIDs = {
  TODO: 'Todo',
};

const SorterIDs = {
  CREATION_DATE: 'SortByCreation',
  PRIORITY: 'SortByPriority',
  PROJECT: 'SortByProject',
  DUE_DATE: 'SortByDueDate',
};

const PriorityIDs = {
  NONE: 'NonPriority',
  LOW: 'LowPriority',
  MID: 'MediumPriority',
  HIGH: 'HighPriority',
  URGENT: 'CriticalPriority',
};

export { InstanceIDs, ModelIDs, SorterIDs, PriorityIDs };
