'use strict';

(function () {
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

  const createWizard = (count) => {
    const wizards = [];
    for (let i = 0; i < count; i++) {
      wizards.push({
        name: WIZARD_NAMES[window.util.getRandomNumber(WIZARD_NAMES.length)],
        surname: WIZARD_SURNAMES[window.util.getRandomNumber(WIZARD_SURNAMES.length)],
        coatColor: COAT_COLORS[window.util.getRandomNumber(COAT_COLORS.length)],
        eyesColor: EYES_COLORS[window.util.getRandomNumber(EYES_COLORS.length)]
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

  window.setup = {
    COAT_COLORS,
    EYES_COLORS,
    FIREBALL_COLORS,
  };
})();
