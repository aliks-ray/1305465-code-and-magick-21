'use strict';

(function () {
  const WIZARDS_COUNT = 4;

  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
  const similarListElement = document.querySelector(`.setup-similar-list`);

  const renderWizard = (wizard) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  const createSimilarWizards = (data) => {
    removeWizards();
    const takeNumber = data.length > WIZARDS_COUNT
      ? WIZARDS_COUNT
      : data.length;

    for (let i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderWizard(data[i]));
    }

    window.modal.setupWindow.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const removeWizards = () => {
    const wizards = similarListElement.querySelectorAll(`.setup-similar-item`);

    wizards.forEach((element) => {
      element.remove();
    });
  };

  window.render = {
    WIZARDS_COUNT,
    renderWizard,
    similarListElement,
    createSimilarWizards
  };
})();
