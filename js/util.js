'use strict';

const DEBOUNCE_INTERVAL = 500;

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

const onError = (errorMessage) => {
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

const debounce = (cb) => {
  let lastTimeout = null;
  return function (...parameters) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

window.util = {
  getRandomNumber,
  getRandomElement,
  getRandomArray,
  onError,
  debounce
};
