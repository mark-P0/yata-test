import ListSortingChips from './ListSortingChips.js';
import FloatingButton from './FloatingButton.js';
import { TodoList } from './Lists.js';
import { E } from '../__dom__.js';

const Main = () => {
  const attributes = {
    class: 'position-relative overflow-auto scrollbar scrollbar-thin',
  };
  const children = [TodoList, FloatingButton, ListSortingChips];

  return E('main', attributes, children);
};

export default Main();
