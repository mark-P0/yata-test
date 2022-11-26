import { TaskDate } from './task-dates.js';
import { InstanceIDs } from './ids.js';

class Task {
  static #toConstructInternally = false;

  id;
  creationDate;
  title;
  description;
  dueDate;
  priority;
  constructor(type, title, description, dueDate, priority) {
    if (Task.#toConstructInternally) return this;

    this.id = InstanceIDs.generate(type);
    this.creationDate = TaskDate.current;
    this.title = title;
    this.description = description;
    this.dueDate = new TaskDate(dueDate);
    this.priority = Number.parseInt(priority) || 0;
  }

  /** @type {(instance: Task, asDatetime: boolean) => {}} */
  static objectify(instance, asDatetime = false) {
    let { id, creationDate, title, description, dueDate, priority } = instance;

    creationDate = asDatetime ? creationDate.datetime : creationDate.date;
    dueDate = asDatetime ? dueDate.datetime : dueDate.date;

    return { id, creationDate, title, description, dueDate, priority };
  }
  /** @type {(instance: Task) => [string, string]} */
  static serialize(instance) {
    const { id, ...object } = Task.objectify(instance, true);
    const string = JSON.stringify(object);
    return [id, string];
  }
  /** @type {(id: string, string: string) => Task} */
  static deserialize(id, string) {
    const object = JSON.parse(string);

    this.#toConstructInternally = true;
    const instance = new Task();
    Object.assign(instance, object);
    instance.id = id;
    instance.creationDate = new TaskDate(object.creationDate);
    instance.dueDate = new TaskDate(object.dueDate);
    instance.priority = Number.parseInt(object.priority);
    this.#toConstructInternally = false;

    return instance;
  }
}

export { Task };
