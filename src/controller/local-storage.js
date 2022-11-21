import { Events } from './pubsub.js';

const data = [
  {
    key: 'TodoList',
    refreshEvent: Events.REFRESH_TODO_LIST,
    updateEvent: Events.UPDATE_TODO_LIST,
  },
];

for (const { key, refreshEvent, updateEvent } of data) {
  const storedValue = localStorage.getItem(key);
  refreshEvent.publish(JSON.parse(storedValue));

  updateEvent.subscribe((valueToStore) => {
    localStorage.setItem(key, JSON.stringify(valueToStore));
  });
}
