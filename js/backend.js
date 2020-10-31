'use strict';

(function () {

  const TIMEOUT = 20000;
  const SAVE = `https://javascript.pages.academy/code-and-magick`;
  const LOAD = `https://javascript.pages.academy/code-and-magick/data`;

  const StatusCode = {
    OK: 200
  };

  let createRequest = function (method, url, onLoad, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        default:
          onError(`Ошибка соединения. Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс.`);
    });

    xhr.timeout = TIMEOUT;
    xhr.open(method, url);

    return xhr;
  };

  let load = function (onLoad, onError) {
    let xhr = createRequest(`GET`, LOAD, onLoad, onError);
    xhr.send();
  };

  let save = function (data, onLoad, onError) {
    let xhr = createRequest(`POST`, SAVE, onLoad, onError);
    xhr.send(data);
  };

  window.backend = {
    load,
    save
  };

})();
