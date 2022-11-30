import { InstanceIDs } from 'src/model/ids.js';
import BrandIcon from 'src/assets/icon.png';
import ListToggles, {
  ListToggleLabel,
  ListTogglesContainerID,
} from './ListToggles.js';
import { E } from '../__dom__.js';

const NavBrand = E('img', {
  src: BrandIcon,
  class: 'navbar-brand m-0 filter-invert',
  alt: 'Brand icon',
});

const NavCollapseToggleID = InstanceIDs.generate('HTML');
const NavCollapseToggle = E(
  'button',
  {
    type: 'button',
    class: 'navbar-toggler',
    'data-bs-toggle': 'collapse',
    'data-bs-target': '#' + ListTogglesContainerID,
    'aria-controls': ListTogglesContainerID,
    'aria-expanded': false,
    'aria-label': 'Toggle navigation',
    id: NavCollapseToggleID,
  },
  [E('span', { class: 'navbar-toggler-icon' })]
);
ListToggleLabel.setAttribute('for', NavCollapseToggleID);

const Nav = E(
  'nav',
  {
    class: 'navbar navbar-dark navbar-expand-sm bg-dark text-white',
  },
  [NavBrand, ListToggleLabel, NavCollapseToggle, ListToggles]
);

export default Nav;
