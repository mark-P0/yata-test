import FloatingButton from './FloatingButton.js';
import { TodoList } from './Lists.js';
import { E } from '../__dom__.js';

const Main = () => {
  const attributes = {
    class: 'position-relative bg-white pb-5 overflow-auto scrollbar-thin',
  };
  const children = [TodoList, FloatingButton];

  return E('main', attributes, children);
};

export default Main();
