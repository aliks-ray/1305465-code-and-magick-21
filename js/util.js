'use strict';

(function () {
  const getRandomNumber = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const getRandomElement = (elements) => {
    return elements[Math.floor(Math.random() * elements.length)];
  };

  const getRandomArray = (array) => {
    let newArray = [];

    array.forEach((item, i, arr) => {
      newArray[i] = arr[Math.floor(Math.random() * arr.length)];
    });

    return newArray;
  };

  window.util = {
    getRandomNumber,
    getRandomElement,
    getRandomArray
  };
})();
