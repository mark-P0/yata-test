import '../model/todo.js';
import './ui/TodoForm.js';
import './ui/TodoList.js';
import './visibility.js';
import '../controller/local-storage.js';

/* PWA Service Worker */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../service-worker.js');
}

document.getElementById('notice').remove();
