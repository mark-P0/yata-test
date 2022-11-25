import ModelIDs from './model-ids.js';
import { extractPrefix } from './id-generator.js';
import { Task } from './tasks.js';
import { Events } from '../controller/pubsub.js';

class TaskList {
  #type;
  #list;
  constructor(type) {
    this.#type = type;
    this.#list = {};
  }

  add(task) {
    this.#list[task.id] = task;
    Events.UPDATE_DISPLAY.publish({
      type: this.#type,
      data: this.items,
    });
  }

  remove(taskId) {
    delete this.#list[taskId];
    Events.UPDATE_DISPLAY.publish({
      type: this.#type,
      data: this.items,
    });
  }

  get items() {
    return Object.values(this.#list);
  }
}

const TaskLists = {
  [ModelIDs.TODO]: new TaskList(ModelIDs.TODO),
};

Events.READ_STORAGE_ENTRY.subscribe((entry) => {
  const { key, value } = entry;

  const task = Task.deserialize(key, value);
  const type = extractPrefix(key);
  TaskLists[type].add(task);
});

Events.CREATE_TASK.subscribe(({ type, data }) => {
  const args = Object.values(data);
  const task = new Task(type, ...args);
  TaskLists[type].add(task);

  const [key, value] = Task.serialize(task);
  Events.CREATE_STORAGE_ENTRY.publish({ key, value });
});

Events.DELETE_TASK.subscribe(({ type, id }) => {
  TaskLists[type].remove(id);
  Events.DELETE_STORAGE_ENTRY.publish(id);
});
