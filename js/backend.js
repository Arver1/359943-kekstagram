'use strict';
(function () {
  var URL = 'https://1510.dump.academy/kekstagram/data';
  var showError = function (message) {
    console.log(message);
  };
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
          showError(xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.send();
    },
    save: function (data, onLoad, onError) {
    }
  };
})();
