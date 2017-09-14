'use strict';
(function () {
  var div = document.querySelector('.pictures');
  var template = document.getElementById('picture-template').content;
  var appendPictures = function (pictures, callback) {
    for (var i = 0; i < pictures.length; i++) {
      var element = template.cloneNode(true);
      element.querySelector('img').src = pictures[i].url;
      element.querySelector('.picture-likes').textContent = pictures[i].likes;
      element.querySelector('.picture-comments').textContent = pictures[i].comments;
      div.appendChild(element);
    }
    if (callback) {
      callback();
    }
  };
  window.backend.load(appendPictures, window.util.onError);
})();
