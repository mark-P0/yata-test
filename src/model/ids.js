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
  TODO: 'TodoTask',
  PROJECT: 'ProjectTask',
};

const SorterIDs = {
  CREATION_DATE: 'SortByCreation',
  PRIORITY: 'SortByPriority',
  DUE_DATE: 'SortByDueDate',
};

const FilterIDs = {
  PARENT: 'FilterByParent',
};

const PriorityIDs = {
  NONE: 'NonPriority',
  LOW: 'LowPriority',
  MID: 'MediumPriority',
  HIGH: 'HighPriority',
  URGENT: 'CriticalPriority',
};

const TaskParameterIDs = {
  TITLE: 'TaskTitle',
  DESCRIPTION: 'TaskDescription',
  DUE_DATE: 'TaskDueDate',
  PRIORITY: 'TaskPriority',
  PARENT: 'TaskParent', // Parent task to which the current task belongs
};

export {
  InstanceIDs,
  ModelIDs,
  SorterIDs,
  FilterIDs,
  PriorityIDs,
  TaskParameterIDs,
};
