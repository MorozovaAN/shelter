import { pets } from '../components/constants';
import { createSliderCards, debounce } from '../components/slider';

export const slider = () => {
  const petsSlider = document.querySelector('.pets-slider__wrapper');
  const sliderContentContainer = document.querySelector(
    '.pets-slider__content-container',
  );
  const sliderBtnDoubleLeft = document.querySelector(
    '.pagination__double-arrow-left',
  );
  const sliderBtnSingleLeft = document.querySelector(
    '.pagination__single-arrow-left',
  );
  const sliderBtnDoubleRight = document.querySelector(
    '.pagination__double-arrow-right',
  );
  const sliderBtnSingleRight = document.querySelector(
    '.pagination__single-arrow-right',
  );
  const sliderNumber = document.querySelector('.button-circle_number');
  const randomNums = [];
  let sliderWidth;
  let lengthToMove = 0;
  let count = 1;

  function resetMoveParams(transitionTime) {
    lengthToMove = 0;
    count = 1;
    sliderNumber.textContent = count;
    sliderWidth = petsSlider.clientWidth;
    const arr = sliderContentContainer.querySelectorAll(
      '.pets-slider__content',
    );

    arr.forEach((elem) => {
      elem.style.width = `${sliderWidth}px`;
    });

    sliderContentContainer.style.transition = `all ${transitionTime}s ease`;
    sliderBtnSingleLeft.setAttribute('disabled', '');
    sliderBtnDoubleLeft.setAttribute('disabled', '');
    sliderBtnSingleRight.removeAttribute('disabled');
    sliderBtnDoubleRight.removeAttribute('disabled');
  }

  function getFirstSliderCards() {
    if (window.screen.availWidth > 1279) {
      for (let i = 0; i < 6; i++) {
        createSliderCards(
          8,
          'pets-slider__content',
          sliderContentContainer,
          'append',
          randomNums,
          pets,
        );
      }
      resetMoveParams(1);
    }

    if (window.screen.availWidth <= 1279 && window.screen.availWidth > 639) {
      for (let i = 0; i < 8; i++) {
        createSliderCards(
          6,
          'pets-slider__content',
          sliderContentContainer,
          'append',
          randomNums,
          pets,
        );
      }
      resetMoveParams(0.8);
    }

    if (window.screen.availWidth <= 639) {
      for (let i = 0; i < 16; i++) {
        createSliderCards(
          3,
          'pets-slider__content',
          sliderContentContainer,
          'append',
          randomNums,
          pets,
        );
      }
      resetMoveParams(0.7);
    }
  }

  function rightSingleClick(maxCount) {
    lengthToMove += sliderWidth + 40;
    sliderContentContainer.style.marginLeft = `-${lengthToMove}px`;
    count++;
    sliderNumber.textContent = count;
    if (count === maxCount) {
      sliderBtnSingleRight.setAttribute('disabled', '');
      sliderBtnDoubleRight.setAttribute('disabled', '');
    }
    if (count === 2) {
      sliderBtnSingleLeft.removeAttribute('disabled');
      sliderBtnDoubleLeft.removeAttribute('disabled');
    }
  }

  function rightDoubleClick(maxCount) {
    sliderWidth = petsSlider.clientWidth;
    lengthToMove = (sliderWidth + 40) * (maxCount - 1);
    sliderContentContainer.style.marginLeft = `-${lengthToMove}px`;
    sliderBtnSingleRight.setAttribute('disabled', '');
    sliderBtnDoubleRight.setAttribute('disabled', '');
    count = maxCount;
    sliderNumber.textContent = count;
    sliderBtnSingleLeft.removeAttribute('disabled');
    sliderBtnDoubleLeft.removeAttribute('disabled');
  }

  getFirstSliderCards();

  sliderBtnSingleRight.addEventListener('click', () => {
    if (window.screen.availWidth > 1279) {
      rightSingleClick(6);
    }
    if (window.screen.availWidth <= 1279 && window.screen.availWidth > 639) {
      rightSingleClick(8);
    }
    if (window.screen.availWidth <= 639) {
      rightSingleClick(16);
    }
  });

  sliderBtnSingleLeft.addEventListener('click', () => {
    lengthToMove -= sliderWidth + 40;
    sliderContentContainer.style.marginLeft = `-${lengthToMove}px`;
    sliderBtnSingleRight.removeAttribute('disabled');
    sliderBtnDoubleRight.removeAttribute('disabled');
    count--;
    sliderNumber.textContent = count;
    if (count === 1) {
      sliderBtnSingleLeft.setAttribute('disabled', '');
      sliderBtnDoubleLeft.setAttribute('disabled', '');
    }
  });

  sliderBtnDoubleRight.addEventListener('click', () => {
    if (window.screen.availWidth > 1279) {
      rightDoubleClick(6);
    }
    if (window.screen.availWidth <= 1279 && window.screen.availWidth > 639) {
      rightDoubleClick(8);
    }
    if (window.screen.availWidth <= 639) {
      rightDoubleClick(16);
    }
  });

  sliderBtnDoubleLeft.addEventListener('click', () => {
    lengthToMove = 0;
    sliderContentContainer.style.marginLeft = `${lengthToMove}px`;
    count = 1;
    sliderNumber.textContent = count;
    sliderBtnSingleLeft.setAttribute('disabled', '');
    sliderBtnDoubleLeft.setAttribute('disabled', '');
    sliderBtnSingleRight.removeAttribute('disabled');
    sliderBtnDoubleRight.removeAttribute('disabled');
  });

  window.addEventListener(
    'resize',
    debounce(() => {
      sliderContentContainer.innerHTML = '';
      sliderContentContainer.style.transition = 'none';
      sliderContentContainer.style.marginLeft = '0px';
      getFirstSliderCards();
    }, 200),
  );
};
