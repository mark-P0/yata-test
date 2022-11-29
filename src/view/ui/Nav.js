import BrandIcon from 'src/assets/icon.png';
import ListToggles from './ListToggles.js';
import { E } from '../__dom__.js';

const NavBrand = () => {
  return E('img', { src: BrandIcon, class: 'filter-invert' });
};

const Nav = () => {
  const nav = E('nav', { class: 'bg-dark text-white d-flex gap-3 p-3' }, [
    ListToggles,
    NavBrand(),
  ]);

  return nav;
};

export default Nav();
