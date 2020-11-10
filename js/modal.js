'use strict';

(function () {

  const setupWindow = document.querySelector(`.setup`);
  const setupButtonOpen = document.querySelector(`.setup-open`);
  const setupButtonClose = document.querySelector(`.setup-close`);
  const setupForm = setupWindow.querySelector(`.setup-wizard-form`);

  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape` && evt.target.name !== `username`) {
      evt.preventDefault();
      closePopup();
    }
  };

  const openPopup = () => {
    setupWindow.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onPopupEscPress);
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

  window.modal = {
    setupWindow
  };
})();
