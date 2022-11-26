import { PriorityIDs } from './ids.js';

const mapValue = {
  [PriorityIDs.NONE]: 0,
  [PriorityIDs.LOW]: 1,
  [PriorityIDs.MID]: 2,
  [PriorityIDs.HIGH]: 3,
  [PriorityIDs.URGENT]: 4,
};

class Priority {
  id;
  constructor(id) {
    this.id = id;
  }
  toString() {
    return this.id;
  }
  toJSON() {
    return this.id;
  }
  valueOf() {
    return mapValue[this.id];
  }
}

export { Priority };
