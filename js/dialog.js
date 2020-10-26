'use strict';

(function () {
  const SETUP_TOP = 80 + `px`;
  const SETUP_LEFT = 50 + `%`;
  const setup = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = document.querySelector(`.setup-close`);

  const dialogHandle = setup.querySelector(`.upload`);

  const onSetupPressEsc = function (evt) {
    if (evt.key === `Escape` && evt.target !== window.form.userNameInput) {
      evt.preventDefault();
      setup.classList.add(`hidden`);
    }
  };

  const openSetup = function () {
    setup.classList.remove(`hidden`);
    setup.style.top = SETUP_TOP;
    setup.style.left = SETUP_LEFT;
    document.addEventListener(`keydown`, onSetupPressEsc);
  };

  const closeSetup = function () {
    setup.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onSetupPressEsc);
  };

  setupOpen.addEventListener(`click`, function () {
    openSetup();
  });

  setupOpen.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      openSetup();
    }
  });

  setupClose.addEventListener(`click`, function () {
    closeSetup();
  });

  setupClose.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      closeSetup();
    }
  });

  dialogHandle.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + `px`;
      setup.style.left = (setup.offsetLeft - shift.x) + `px`;
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener(`click`, onClickPreventDefault);
        };
        dialogHandle.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);

  });
})();
