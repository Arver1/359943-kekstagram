'use strict';
(function () {
  window.util = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    }
  };
})();
