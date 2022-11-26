import { InstanceIDs, ModelIDs } from './ids.js';
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
    Events.UPDATE_DISPLAY_ITEMS.publish({
      type: this.#type,
      data: this.items,
    });
  }
  remove(taskId) {
    delete this.#list[taskId];
    Events.UPDATE_DISPLAY_ITEMS.publish({
      type: this.#type,
      data: this.items,
    });
  }
  get(taskId) {
    return this.#list[taskId];
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
  const type = InstanceIDs.extractPrefix(key);
  TaskLists[type].add(task);
});

Events.CREATE_TASK.subscribe(({ type, data }) => {
  const task = new Task(type, data);
  TaskLists[type].add(task);

  const [key, value] = Task.serialize(task);
  Events.CREATE_STORAGE_ENTRY.publish({ key, value });
});

Events.UPDATE_TASK.subscribe(({ type, data, id }) => {
  const task = TaskLists[type].get(id);
  task.update(data);
  TaskLists[type].add(task);

  const [key, value] = Task.serialize(task);
  Events.UPDATE_STORAGE_ENTRY.publish({ key, value });
});

Events.DELETE_TASK.subscribe((id) => {
  const type = InstanceIDs.extractPrefix(id);
  TaskLists[type].remove(id);
  Events.DELETE_STORAGE_ENTRY.publish(id);
});
