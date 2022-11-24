import { Events } from '../controller/pubsub.js';

const Display = (() => {
  let items = null;

  return {
    get items() {
      return items;
    },
    set items(newItems) {
      items = newItems;
      Events.EMIT_DISPLAY.publish(items);
    },
  };
})();

Events.UPDATE_TODO_LIST.subscribe((items) => {
  Display.items = items;
});
