import './model/todo.js';
import ListToggles from './view/ui/ListToggles.js';
import './view/ui/TodoForm.js';
import './view/ui/TodoList.js';
import './view/visibility.js';
import './controller/local-storage.js';

/* PWA Service Worker */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}

/* Remove JS requirement notice */
document.getElementById('notice').remove();

/* Build webpage via JS */
document.body.prepend(ListToggles);
