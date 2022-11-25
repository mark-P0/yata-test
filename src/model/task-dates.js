/**
 * YYYY-MM-DD ⇄ [Date object]
 */
class TaskDate {
  /** @type {(str: string) => Date} */
  static #parse(str) {
    const [year, month, day] = str
      .split('-')
      .map((part) => Number.parseInt(part));
    return new Date(year, month - 1, day);
  }
  /** @type {(date: Date) => string} */
  static #format(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  date;
  constructor(dateStr = null) {
    this.date = dateStr ? TaskDate.#parse(dateStr) : new Date();
  }
  static get current() {
    return new this();
  }
  toString() {
    /* For supporting implicit casts to strings, e.g. `JSON.stringify()` */
    return TaskDate.#format(this.date);
  }
}

export { TaskDate };
