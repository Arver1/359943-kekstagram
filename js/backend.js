'use strict';
(function () {
  var URL = 'https://1510.dump.academy/kekstagram/data';
  var URL_SERVER = 'https://1510.dump.academy/kekstagram';
  var showError = function (message) {
    var node = document.createElement('div');
    node.classList.add('errorMessage');
    node.style.zIndex = '100';
    node.style.margin = '0 auto';
    node.style.backgroundColor = 'red';
    node.style.textAlign = 'center';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    document.body.insertAdjacentElement('afterBegin', node);
    node.textContent = message;
    setTimeout(function () {
      document.querySelector('.errorMessage').remove();
    }, 5000);
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
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', URL_SERVER);
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad();
        } else {
          showError(xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.send(data);
    }
  };
})();
