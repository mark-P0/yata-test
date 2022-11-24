import { TodoList } from './lists.js';
import { generateId } from './id-generator.js';
import { Events } from '../controller/pubsub.js';

class Todo {
  id;
  title;
  description;
  dueDate;
  priority;

  constructor(title, description, dueDate, priority) {
    this.id = generateId(this.constructor.name);

    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = Number.parseInt(priority) || 0;
  }

  static serialize(instance) {
    const { id, title, description, dueDate, priority } = instance;
    const object = { title, description, dueDate, priority };
    const string = JSON.stringify(object);
    return [id, string];
  }
  static deserialize(id, string) {
    const object = JSON.parse(string);
    const instance = new Todo(...Object.values(object));
    instance.id = id;
    return instance;
  }
}

Events.READ_STORAGE_ENTRY.subscribe((entry) => {
  const { key, value } = entry;
  if (!key.startsWith(Todo.prototype.constructor.name)) return;
  const todo = Todo.deserialize(key, value);
  TodoList.add(todo);
});

Events.CREATE_TODO.subscribe((data) => {
  const args = Object.values(data);
  const todo = new Todo(...args);
  TodoList.add(todo);

  const [key, value] = Todo.serialize(todo);
  Events.CREATE_STORAGE_ENTRY.publish({ key, value });
});

Events.DELETE_TODO.subscribe((todoId) => {
  TodoList.remove(todoId);
  Events.DELETE_STORAGE_ENTRY.publish(todoId);
});
