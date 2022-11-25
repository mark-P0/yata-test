import { Events } from './pubsub.js';

Events.CREATE_STORAGE_ENTRY.subscribe((entry) => {
  const { key, value } = entry;
  localStorage.setItem(key, value);
});

Events.INITIALIZATION.subscribe(() => {
  for (const [key, value] of Object.entries(localStorage)) {
    const entry = { key, value };
    Events.READ_STORAGE_ENTRY.publish(entry);
  }
});

Events.DELETE_STORAGE_ENTRY.subscribe((key) => {
  localStorage.removeItem(key);
});
