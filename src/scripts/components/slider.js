export function getRandomNums(arrPets, count, randomNumsArr) {
  const max = arrPets.length - 1;
  const min = 0;
  let resultArr = [];
  if (randomNumsArr.length < 4) resultArr = randomNumsArr;
  const randomNumsArrLength = randomNumsArr.length;

  function getRandom() {
    const one = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!resultArr.includes(one)) resultArr.push(one);
    else {
      getRandom();
    }
  }
  for (let i = 0; i < count; i++) {
    getRandom();
  }

  if (resultArr.length > count) {
    resultArr.splice(0, randomNumsArrLength);
  }

  return resultArr;
}

export function createSliderCards(
  count,
  elemClass,
  parentElement,
  position,
  randomNumsArr,
  arrPets,
) {
  const cardsContent = document.createElement('div');
  cardsContent.classList.add(elemClass);

  randomNumsArr = getRandomNums(arrPets, count, randomNumsArr);

  randomNumsArr.forEach((randomPet) => {
    const card = document.createElement('article');
    card.innerHTML = `
            <img
              class="slider__image"
              src="${arrPets[randomPet].img}"
              alt="pet photo"
            />
            <p class="slider__title">${arrPets[randomPet].name}</p>
            <button class="button button_secondary" type="button">
              Learn more
            </button>
          `;
    card.classList.add('slider__card');
    card.setAttribute('data-id', randomPet);
    cardsContent.append(card);
  });

  if (parentElement === '') return cardsContent;
  else parentElement[position](cardsContent);
}

export function debounce(callback, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}
