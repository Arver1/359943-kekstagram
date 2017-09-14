'use strict';
(function () {
  window.util = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    },
    onError: function (message) {
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
    }
  };
})();
