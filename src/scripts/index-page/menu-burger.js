import { add, remove } from '../components/constants';
import { menuBurgerInteractions } from '../components/menu-burger';

export const menuBurger = () => {
  const btnMenuOpen = document.querySelector('.menu-button_theme-dark');
  const btnMenuClose = document.querySelector('.menu-button-close_theme-dark');
  const page = document.querySelector('.page');
  const pageBlackout = document.querySelector('.page-blackout');
  const navigation = document.querySelector('.navigation');
  const navigationLinks = document.querySelectorAll('.navigation__link ');
  const headerLogo = document.querySelector('.header__logo');

  btnMenuOpen.addEventListener('click', () => {
    menuBurgerInteractions(add, page, pageBlackout, navigation, headerLogo);
  });
  btnMenuClose.addEventListener('click', () => {
    menuBurgerInteractions(remove, page, pageBlackout, navigation, headerLogo);
  });
  pageBlackout.addEventListener('click', () => {
    menuBurgerInteractions(remove, page, pageBlackout, navigation, headerLogo);
  });

  navigationLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuBurgerInteractions(
        remove,
        page,
        pageBlackout,
        navigation,
        headerLogo,
      );
    });
  });
};
