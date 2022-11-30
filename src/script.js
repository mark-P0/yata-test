import './view/bs/bootstrap.js';
import './view/css/styles.css';

import './model/task-lists.js';
import './model/display.js';
import Modal from './view/ui/Modal.js';
import Main from './view/ui/Main.js';
import Nav from './view/ui/Nav.js';
import './view/visibility.js';
import './controller/local-storage.js';
import { Events } from './controller/pubsub.js';

/* PWA Service Worker */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}

/* Initialize elements as necessary */
Events.INITIALIZATION.publish(null);

/*  Build webpage via JS
 *  Also removes the JS requirement notice
 */
document.body.replaceChildren(Nav, Main, Modal);
