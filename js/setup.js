'use strict';

(function () {
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

  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
  const similarListElement = document.querySelector(`.setup-similar-list`);

  const renderWizard = (wizard) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  let onError = (errorMessage) => {
    const errorElement = document.createElement(`div`);
    errorElement.style =
    `z-index: 100;
    margin: auto;
    padding: 30px;
    width: 600px;
    top: 50%;
    left: 50%;
    text-align: center;
    background-color: #be3827;
    color: white;
    box-shadow: 0 10px 10px rgba(0, 1, 1, 0.3);`;
    errorElement.style.position = `absolute`;
    errorElement.style.left = 0;
    errorElement.style.right = 0;
    errorElement.style.fontSize = `30px`;

    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, errorElement);

    setTimeout(function () {
      errorElement.remove();
    }, 3000);
  };

  const successLoding = (wizards) => {
    const fragment = document.createDocumentFragment();
    const randomWizards = window.util.getRandomArray(wizards);
    for (let i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(randomWizards[i]));
    }
    similarListElement.appendChild(fragment);

    window.modal.setupWindow.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  window.backend.load(successLoding, onError);
  window.setup = {
    COAT_COLORS,
    EYES_COLORS,
    FIREBALL_COLORS,
    onError
  };
})();
