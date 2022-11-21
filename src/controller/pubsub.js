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
  CREATE_TODO: new Event(),
  DELETE_TODO: new Event(),
  UPDATE_TODO_LIST: new Event(),

  CREATE_STORAGE_ENTRY: new Event(),
  READ_STORAGE_ENTRY: new Event(),
  DELETE_STORAGE_ENTRY: new Event(),
};

export { Events };
