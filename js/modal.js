'use strict';

(function () {
  const setupWindow = document.querySelector(`.setup`);
  const setupButtonOpen = document.querySelector(`.setup-open`);
  const setupButtonClose = document.querySelector(`.setup-close`);
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

  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape` && evt.target.name !== `username`) {
      evt.preventDefault();
      closePopup();
    }
  };

  const openPopup = () => {
    setupWindow.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onPopupEscPress);

    changeColor(wizardElements.coat, window.setup.COAT_COLORS, `fill`);
    changeColor(wizardElements.eyes, window.setup.EYES_COLORS, `fill`);
    changeColor(wizardElements.fireball, window.setup.FIREBALL_COLORS, `background`);
  };

  setupButtonOpen.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      openPopup();
    }
  });

  setupButtonOpen.onclick = () => {
    openPopup();
  };

  const closePopup = () => {
    setupWindow.classList.add(`hidden`);

    document.addEventListener(`keydown`, onPopupEscPress);
  };

  setupButtonClose.onclick = () => {
    closePopup();
  };

  setupButtonClose.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      closePopup();
    }
  });

  setupForm.addEventListener(`submit`, (evt) => {
    window.backend.save(new FormData(setupForm), closePopup, window.setup.onError);
    evt.preventDefault();
  });

  const changeColor = (obj, arr, property) => {
    obj.elem.addEventListener(`click`, () => {
      const color = window.util.getRandomElement(arr);
      const input = obj.input;
      obj.elem.style = `${property}: ${color}`;
      input.value = `${color}`;
    });
  };
  window.modal = {
    setupWindow
  };
})();
