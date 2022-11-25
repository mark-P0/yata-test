import { TaskDate } from './task-dates.js';
import { generateId } from './id-generator.js';

class Task {
  static #typeIsId = false;

  id;
  title;
  description;
  #dueDate;
  priority;
  constructor(type, title, description, dueDate, priority) {
    this.id = this.constructor.#typeIsId ? type : generateId(type);
    this.title = title;
    this.description = description;
    this.#dueDate = new TaskDate(dueDate);
    this.priority = Number.parseInt(priority) || 0;
  }
  get dueDate() {
    return `${this.#dueDate}`;
  }

  static serialize(instance) {
    const { id, title, description, dueDate, priority } = instance;
    const object = { title, description, dueDate, priority };
    const string = JSON.stringify(object);
    return [id, string];
  }
  static deserialize(id, string) {
    const object = JSON.parse(string);
    this.#typeIsId = true;
    const instance = new this(id, ...Object.values(object));
    this.#typeIsId = false;
    return instance;
  }
}

export { Task };
