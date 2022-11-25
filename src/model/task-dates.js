/**
 * `YYYY-MM-DD_HH:MM:SS` ⇄ `[Date object]`
 */
class TaskDate {
  /** @type {(datetime: string) => Date} */
  static parse(datetime) {
    const [date, time] = datetime.split('_');
    const base = new Date();

    const [year, month, day] = date
      .split('-')
      .map((part) => Number.parseInt(part));
    base.setFullYear(year, month - 1, day);

    if (time) {
      const [hours, minutes, seconds] = time
        .split(':')
        .map((part) => Number.parseInt(part));
      base.setHours(hours, minutes, seconds);
    }

    return base;
  }
  /** @type {(obj: Date, as: {date: boolean, time: boolean}) => string} */
  static format(obj, { asDate = false, asTime = false } = {}) {
    const year = obj.getFullYear();
    const month = obj.getMonth() + 1;
    const day = obj.getDate();
    const date = `${year}-${month}-${day}`;
    if (asDate) return date;

    const hours = obj.getHours();
    const minutes = obj.getMinutes();
    const seconds = obj.getSeconds();
    const time = `${hours}:${minutes}:${seconds}`;
    if (asTime) return time;

    return `${date}_${time}`;
  }

  obj;
  constructor(dateStr = null) {
    this.obj = dateStr ? TaskDate.parse(dateStr) : new Date();
  }
  static get current() {
    return new TaskDate();
  }
  toJSON() {
    /* For supporting `JSON.stringify()` */
    return this.datetime;
  }
  get datetime() {
    return TaskDate.format(this.obj);
  }
  get date() {
    return TaskDate.format(this.obj, { asDate: true });
  }
  get time() {
    return TaskDate.format(this.obj, { asTime: true });
  }
}

export { TaskDate };
