'use strict';

const WIZARD_NAMES = [
  `Иван `,
  `Хуан Себастьян `,
  `Мария `,
  `Кристоф `,
  `Виктор `,
  `Юлия `,
  `Люпита `,
  `Вашингтон `
];
const WIZARD_SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];
const COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];
const EYES_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];
const FIREBALL_COLORS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];
const WIZARDS_COUNT = 4;

const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const createWizard = (count) => {
  const wizards = [];
  for (let i = 0; i < count; i++) {
    wizards.push({
      name: WIZARD_NAMES[getRandomNumber(WIZARD_NAMES.length)],
      surname: WIZARD_SURNAMES[getRandomNumber(WIZARD_SURNAMES.length)],
      coatColor: COAT_COLORS[getRandomNumber(COAT_COLORS.length)],
      eyesColor: EYES_COLORS[getRandomNumber(EYES_COLORS.length)]
    });
  }
  return wizards;
};
const wizards = createWizard(WIZARDS_COUNT);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
const similarListElement = document.querySelector(`.setup-similar-list`);

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name + wizard.surname;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < WIZARDS_COUNT; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

// Модальное окно создания персонажа

const setupWindow = document.querySelector(`.setup`);
const setupButtonOpen = document.querySelector(`.setup-open`);
const setupButtonClose = document.querySelector(`.setup-close`);
const similarWizardsList = setupWindow.querySelector(`.setup-similar`);
const setupForm = setupWindow.querySelector(`.setup-wizard-form`);

const wizardElements = {
  coat: {
    elem: setupWindow.querySelector(`.wizard-coat`),
    input: setupWindow.querySelector(`input[name = "coat-color"]`)
  },
  eyes: {
    elem: setupWindow.querySelector(`.wizard-eyes`),
    input: setupWindow.querySelector(`input[name = "eyes-color"]`)
  },
  fireball: {
    elem: setupWindow.querySelector(`.setup-fireball-wrap`),
    input: setupWindow.querySelector(`input[name = "fireball-color"]`)
  }
};

// Функция для получения рандомного элемента

const getRandomElement = (elements) => {
  return elements[Math.floor(Math.random() * elements.length)];
};

// Модальное окно создания персонажа - функция закрытия по Escape

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape` && evt.target.name !== `username`) {
    evt.preventDefault();
    closePopup();
  }
};

// Модальное окно создания персонажа - функция открытия

const openPopup = () => {
  setupWindow.classList.remove(`hidden`);
  similarWizardsList.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);

  changeColor(wizardElements.coat, COAT_COLORS, `fill`);
  changeColor(wizardElements.eyes, EYES_COLORS, `fill`);
  changeColor(wizardElements.fireball, FIREBALL_COLORS, `background`);
};

// Открытие модального окна по Enter

setupButtonOpen.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

// Открытие модального окна по клику

setupButtonOpen.onclick = () => {
  openPopup();
};

// Модальное окно создания персонажа - функция закрытия

const closePopup = () => {
  setupWindow.classList.add(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

// Закрытие модального окна по клику на крестике

setupButtonClose.onclick = () => {
  closePopup();
};

// Закрытие модального окна по Enter на крестике

setupButtonClose.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

setupForm.addEventListener(`submit`, (evt) => {

  evt.preventDefault();
});

// Изменение цвета глаз, мантии и фаербола на рандомный по клику на них

const changeColor = (obj, arr, property) => {
  obj.elem.addEventListener(`click`, () => {
    const color = getRandomElement(arr);
    const input = obj.input;
    obj.elem.style = `${property}: ${color}`;
    input.value = `${color}`;
  });
};
