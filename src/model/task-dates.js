/** @type {(num: number) => string} */
function leftPad0(num) {
  return num.toString().padStart(2, '0');
}

/**
 * `YYYY-MM-DD_HH:MM:SS` ⇄ `[Date object]`
 */
class TaskDate {
  /** @type {(datetime: string) => Date} */
  static parse(datetime) {
    const [date, time] = datetime.split('_');

    const [year, month, day] = date
      .split('-')
      .map((part) => Number.parseInt(part));

    let hours, minutes, seconds;
    hours = minutes = seconds = null;
    if (time) {
      [hours, minutes, seconds] = time
        .split(':')
        .map((part) => Number.parseInt(part));
    }

    return new Date(year, month - 1, day, hours, minutes, seconds);
  }
  /** @type {(obj: Date, as: {date: boolean, time: boolean}) => string} */
  static format(obj, { asDate = false, asTime = false } = {}) {
    const year = leftPad0(obj.getFullYear());
    const month = leftPad0(obj.getMonth() + 1);
    const day = leftPad0(obj.getDate());
    const date = `${year}-${month}-${day}`;
    if (asDate) return date;

    const hours = leftPad0(obj.getHours());
    const minutes = leftPad0(obj.getMinutes());
    const seconds = leftPad0(obj.getSeconds());
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

  valueOf() {
    /*  For supporting arithmetic operations
     *  Converts date to a primitive value, i.e. a number (milliseconds)
     */
    return this.obj.getTime();
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
