'use strict';
(function () {
  var URL = 'https://1510.dump.academy/kekstagram/data';
  var URL_SERVER = 'https://1510.dump.academy/kekstagram';
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', URL);
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          if (onLoad) {
            onLoad(xhr.response, window.preview.fillFirstOverlay);
          }
        } else {
          onError(xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 10000;
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', URL_SERVER);
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad();
        } else {
          onError(xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 10000;
      xhr.send(data);
    }
  };
})();
