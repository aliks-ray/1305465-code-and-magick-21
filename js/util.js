'use strict';

(function () {
  const getRandomNumber = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const getRandomElement = (elements) => {
    return elements[Math.floor(Math.random() * elements.length)];
  };

  window.util = {
    getRandomNumber,
    getRandomElement,
  };
})();
