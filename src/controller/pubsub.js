const Event = () => {
  const subscribers = [];

  const publish = (data) => {
    for (const callback of subscribers) callback(data);
  };
  const subscribe = (callback) => {
    subscribers.push(callback);
  };

  return { publish, subscribe };
};

const Events = {
  CREATE_TODO: Event(),
  DELETE_TODO: Event(),

  REFRESH_TODO_LIST: Event(),
  UPDATE_TODO_LIST: Event(),

  REFRESH_TODO_ID: Event(),
  UPDATE_TODO_ID: Event(),
};

export { Events };
