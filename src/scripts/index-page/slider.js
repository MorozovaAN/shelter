import { pets } from '../components/constants';
import {
  createSliderCards,
  debounce,
} from '../components/slider';

export const slider = () => {
  const sliderContentContainer = document.querySelector(
    '.slider__content-container',
  );
  const sliderBtnLeft = document.querySelector('.slider-button-left');
  const sliderBtnRight = document.querySelector('.slider-button-right');
  const randomNums = [];

  function sliderBtnClick(
    buttonLeft,
    buttonRight,
    parentElement,
    cardsCount,
    randomNumsArr,
    arrPets,
    marginSign,
    translateSign,
  ) {
    buttonLeft.setAttribute('disabled', '');
    buttonRight.setAttribute('disabled', '');
    parentElement.classList.add('slider_transition');
    const sliderWidth = parentElement.clientWidth;
    createSliderCards(
      cardsCount,
      'slider__content_pos-absolute',
      parentElement,
      'prepend',
      randomNumsArr,
      arrPets,
    );
    const sliderContent = parentElement.querySelector('.slider__content');
    const sliderContentAbsolute = parentElement.querySelector(
      '.slider__content_pos-absolute',
    );
    sliderContentAbsolute.style.width = `${sliderWidth}px`;
    sliderContentAbsolute.style.marginLeft = `${marginSign}${
      sliderWidth + 50
    }px`;
    parentElement.style.transform = `translateX(${translateSign}${
      sliderWidth + 50
    }px)`;
    setTimeout(() => {
      sliderContent.remove();
      parentElement.style.transform = 'translateX(0px)';
      sliderContentAbsolute.style.marginLeft = '0px';
      sliderContentAbsolute.classList.add('slider__content');
      sliderContentAbsolute.classList.remove('slider__content_pos-absolute');
      parentElement.classList.remove('slider_transition');
      buttonLeft.removeAttribute('disabled');
      buttonRight.removeAttribute('disabled');
    }, 1000);
  }

  function getFirstSliderCards() {
    if (window.screen.availWidth > 1200) {
      createSliderCards(
        3,
        'slider__content',
        sliderContentContainer,
        'append',
        randomNums,
        pets,
      );
    }
    if (window.screen.availWidth <= 1200 && window.screen.availWidth >= 900) {
      createSliderCards(
        2,
        'slider__content',
        sliderContentContainer,
        'append',
        randomNums,
        pets,
      );
    }
    if (window.screen.availWidth < 900) {
      createSliderCards(
        1,
        'slider__content',
        sliderContentContainer,
        'append',
        randomNums,
        pets,
      );
    }
  }

  getFirstSliderCards();

  sliderBtnLeft.addEventListener('click', () => {
    if (window.screen.availWidth > 1200) {
      sliderBtnClick(
        sliderBtnLeft,
        sliderBtnRight,
        sliderContentContainer,
        3,
        randomNums,
        pets,
        '-',
        '+',
      );
    }
    if (window.screen.availWidth <= 1200 && window.screen.availWidth >= 900) {
      sliderBtnClick(
        sliderBtnLeft,
        sliderBtnRight,
        sliderContentContainer,
        2,
        randomNums,
        pets,
        '-',
        '+',
      );
    }
    if (window.screen.availWidth < 900) {
      sliderBtnClick(
        sliderBtnLeft,
        sliderBtnRight,
        sliderContentContainer,
        1,
        randomNums,
        pets,
        '-',
        '+',
      );
    }
  });

  sliderBtnRight.addEventListener('click', () => {
    if (window.screen.availWidth > 1200) {
      sliderBtnClick(
        sliderBtnLeft,
        sliderBtnRight,
        sliderContentContainer,
        3,
        randomNums,
        pets,
        '+',
        '-',
      );
    }
    if (window.screen.availWidth <= 1200 && window.screen.availWidth >= 900) {
      sliderBtnClick(
        sliderBtnLeft,
        sliderBtnRight,
        sliderContentContainer,
        2,
        randomNums,
        pets,
        '+',
        '-',
      );
    }
    if (window.screen.availWidth < 900) {
      sliderBtnClick(
        sliderBtnLeft,
        sliderBtnRight,
        sliderContentContainer,
        1,
        randomNums,
        pets,
        '+',
        '-',
      );
    }
  });

  window.addEventListener(
    'resize',
    debounce(() => {
      const sliderContent = sliderContentContainer.querySelector('.slider__content');
      sliderContent.remove();
      getFirstSliderCards();
    }, 200),
  );
};
