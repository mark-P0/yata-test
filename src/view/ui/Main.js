import FloatingButton from './FloatingButton.js';
import { TodoList } from './Lists.js';
import { E, buildTree } from '../__dom__.js';

const Main = () => {
  const attributes = {
    class:
      'position-relative rounded text-white pb-5 overflow-auto scrollbar-thin',
  };
  const children = [E(TodoList), E(FloatingButton)];

  return E('main', attributes, children);
};

export default buildTree(Main());
