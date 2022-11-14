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
  UPDATE_TODO_LIST: Event(),
  DELETE_TODO: Event(),
};

export { Events };
