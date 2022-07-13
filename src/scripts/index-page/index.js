import '../../styles/main.scss';

import { menuBurger } from './menu-burger';
import { slider } from './slider';
import { popup } from '../components/popup';
import { scrollUp } from './scroll-up';

window.addEventListener('DOMContentLoaded', () => {
  menuBurger();
  slider();
  popup();
  scrollUp();
});
