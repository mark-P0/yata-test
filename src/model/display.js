import { Events } from '../controller/pubsub.js';
import ModelIDs from './model-ids.js';

const Display = {
  src: ModelIDs.TODO, // Hard-code for now
  items: null,
};

Events.UPDATE_DISPLAY.subscribe((items) => {
  const { type, data } = items;
  if (type !== Display.src) return;

  Display.items = items;
  Events.EMIT_DISPLAY.publish(data);
});
