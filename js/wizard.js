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

  const setupWindow = document.querySelector(`.setup`);

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

  const state = {
    coatColor: COAT_COLORS[0],
    eyesColor: EYES_COLORS[0],
  };

  const changeColor = (obj, arr, input) => {
    obj.addEventListener(`click`, () => {
      const color = window.util.getRandomElement(arr);
      if (obj.matches(`.setup-fireball-wrap`)) {
        obj.style.background = color;
        state.fireballColor = color;
      } else if (obj.matches(`.setup-wizard .wizard-coat`)) {
        obj.style.fill = color;
        state.coatColor = color;
      } else {
        obj.style.fill = color;
        state.eyesColor = color;
      }
      input.value = color;
      window.util.debounce(window.setup.updateWizards)();
    });
  };

  changeColor(wizardElements.coat.elem, COAT_COLORS, wizardElements.coat.input);
  changeColor(wizardElements.eyes.elem, EYES_COLORS, wizardElements.eyes.input);
  changeColor(wizardElements.fireball.elem, FIREBALL_COLORS, wizardElements.fireball.input);


  window.wizard = {
    changeColor,
    state
  };
})();
