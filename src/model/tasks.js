import { InstanceIDs, TaskParameterIDs } from './ids.js';
import { TaskDate } from './task-dates.js';
import { Priority } from './priorities.js';

class Task {
  static #toConstructInternally = false;

  id;
  creationDate;
  title;
  description;
  dueDate;
  priority;
  constructor(type, args) {
    if (Task.#toConstructInternally) return this;

    this.id = InstanceIDs.generate(type);
    this.creationDate = TaskDate.current;
    this.update(args);
  }

  update(args) {
    this.title = args[TaskParameterIDs.TITLE];
    this.description = args[TaskParameterIDs.DESCRIPTION];
    this.dueDate = new TaskDate(args[TaskParameterIDs.DUE_DATE]);
    this.priority = new Priority(args[TaskParameterIDs.PRIORITY]);
  }

  /** @type {(instance: Task, asDatetime: boolean) => {}} */
  static objectify(instance, asDatetime = false) {
    let { id, creationDate, title, description, dueDate, priority } = instance;

    creationDate = asDatetime ? creationDate.datetime : creationDate.date;
    dueDate = asDatetime ? dueDate.datetime : dueDate.date;
    priority = priority.id;

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
    instance.priority = new Priority(object.priority);
    this.#toConstructInternally = false;

    return instance;
  }
}

export { Task };
