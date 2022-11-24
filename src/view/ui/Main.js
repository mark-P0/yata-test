import ListSortingChips from './ListSortingChips.js';
import FloatingButton from './FloatingButton.js';
import ListView from './ListView.js';
import { E } from '../__dom__.js';

const Main = () => {
  const attributes = {
    class: 'position-relative overflow-auto scrollbar scrollbar-thin',
  };
  const children = [ListView, FloatingButton, ListSortingChips];

  return E('main', attributes, children);
};

export default Main();
