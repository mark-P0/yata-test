// console.clear();

import './model/todo.js';
import './view/ui/TodoForm.js';
import './view/ui/TodoList.js';
import './view/visibility.js';
import './controller/local-storage.js';

/* PWA Service Worker */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}

document.getElementById('notice').remove();
