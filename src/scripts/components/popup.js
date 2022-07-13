import { pets, add, remove } from './constants';

export const popup = () => {
  const sliderContentContainer = document.querySelector(
    '.slider__content-container',
  );
  const page = document.querySelector('.page');
  const pageBlur = document.querySelector('.page-blur');
  const pageBlackout = document.querySelector('.page-blackout');
  const navigation = document.querySelector('.navigation');
  const scroll = calcScroll();

  function showModal(pets, id) {
    const modal = document.createElement('article');
    modal.innerHTML = `
     <div class="popup__wrapper">
      <div class="popup__content">
         <div class="popup__image-container"> 
          <img class="popup__image" src=${pets[id].img} alt="pet photo">
        </div>
        <div class="popup__info">
        <h3 class="popup__title">${pets[id].name}</h3>
        <h4 class="popup__subtitle">${pets[id].type} - ${pets[id].breed}</h4>
        <p class="popup__description">
        ${pets[id].description}
        </p>
        <ul class="popup__list">
        <li class="popup__item"><b>Age:</b> ${pets[id].age}</li>
        <li class="popup__item"><b>Inoculations:</b> ${pets[id].inoculations}</li>
        <li class="popup__item"><b>Diseases:</b> ${pets[id].diseases}</li>
        <li class="popup__item"><b>Parasites:</b> ${pets[id].parasites}</li>
        </ul>
        <button class="button-circle popup__button" type="button"></button>
      </div>
    </div>
`;
    modal.classList.add('popup');
    page.prepend(modal);
    return modal;
  }

  function modalInteractions(navDisplay, elem, action, widthScroll) {
    navigation.style.display = navDisplay;
    elem.classList[action]('popup__content_animation');
    page.style.marginRight = `${widthScroll}px`;
    page.classList[action]('page_disable-scroll');
    pageBlackout.classList[action]('page__blackout');
    pageBlur.classList[action]('page__blur');
  }

  function calcScroll() {
    const div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  sliderContentContainer.addEventListener('click', (event) => {
    event.preventDefault();
    const card = event.target.closest('.slider__card');
    const { id } = card.dataset;

    if (card) {
      const modal = showModal(pets, id);
      const popupContent = modal.querySelector('.popup__content');
      modalInteractions('none', popupContent, add, scroll);
      const popupWrapper = document.querySelector('.popup__wrapper');

      const modalBtnClose = document.querySelector('.popup__button');

      modal.addEventListener('click', (event) => {
        if (event.target === popupWrapper) {
          modalInteractions('block', popupContent, remove, 0);
          modal.remove();
        }
      });
      modalBtnClose.addEventListener('click', () => {
        modalInteractions('block', popupContent, remove, 0);
        modal.remove();
      });

      popupWrapper.addEventListener('mouseover', (event) => {
        if (event.target === popupWrapper) {
          modalBtnClose.classList.add('popup__button_hover');
        }
      });
      popupWrapper.addEventListener('mouseout', () => {
        modalBtnClose.classList.remove('popup__button_hover');
      });
    }
  });
};
