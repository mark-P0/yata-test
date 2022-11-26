class Event {
  #subscribers;
  constructor() {
    this.#subscribers = [];
  }

  publish(data) {
    for (const callback of this.#subscribers) callback(data);
  }
  subscribe(callback) {
    this.#subscribers.push(callback);
  }
}

const Events = {
  INITIALIZATION: new Event(),

  CREATE_TASK: new Event(),
  UPDATE_TASK: new Event(),
  DELETE_TASK: new Event(),

  CREATE_STORAGE_ENTRY: new Event(),
  READ_STORAGE_ENTRY: new Event(),
  UPDATE_STORAGE_ENTRY: new Event(),
  DELETE_STORAGE_ENTRY: new Event(),

  UPDATE_DISPLAY_ITEMS: new Event(),
  UPDATE_DISPLAY_SORTING: new Event(),
  EMIT_DISPLAY: new Event(),

  CREATE_TODO_FORM: new Event(),
  UPDATE_TODO_FORM: new Event(),
};

export { Events };
