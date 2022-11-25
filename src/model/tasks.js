import { TaskDate } from './task-dates.js';
import { generateId } from './id-generator.js';

class Task {
  static #toConstructInternally = false;

  id;
  #creationDate;
  title;
  description;
  #dueDate;
  priority;
  constructor(type, title, description, dueDate, priority) {
    if (!Task.#toConstructInternally) {
      this.id = generateId(type);
      this.#creationDate = TaskDate.current;
    }

    this.title = title;
    this.description = description;
    this.#dueDate = new TaskDate(dueDate);
    this.priority = Number.parseInt(priority) || 0;
  }
  get dueDate() {
    return this.#dueDate.date;
  }
  get creationDate() {
    return this.#creationDate.date;
  }

  /** @type {(instance: Task) => [string, string]} */
  static serialize(instance) {
    const { id, title, description, priority } = instance;
    const object = {
      title,
      description,
      dueDate: instance.#dueDate,
      priority,
      creationDate: instance.#creationDate,
    };
    const string = JSON.stringify(object);
    return [id, string];
  }
  /** @type {(id: string, string: string) => Task} */
  static deserialize(id, string) {
    const object = JSON.parse(string);

    this.#toConstructInternally = true;
    const instance = new this(null, ...Object.values(object));
    instance.id = id;
    instance.#creationDate = new TaskDate(object.creationDate);
    this.#toConstructInternally = false;

    return instance;
  }
}

export { Task };
