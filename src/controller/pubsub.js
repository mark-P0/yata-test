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

  REFRESH_TODO_LIST: new Event(),
  UPDATE_TODO_LIST: new Event(),
};

export { Events };
