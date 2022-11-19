/* TODO: Import Bootstrap components selectively */
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

import './styles.css';

import './model/todo.js';
import ListToggles from './view/ui/ListToggles.js';
import Main from './view/ui/Main.js';
import Modal from './view/ui/Modal.js';
import './view/visibility.js';
import './controller/local-storage.js';

/* PWA Service Worker */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}

/*  Build webpage via JS
 *  Also removes the JS requirement notice
 */
document.body.replaceChildren(ListToggles, Main, Modal);
