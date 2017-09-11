'use strict';
(function () {
  var appendPictures = function (container, pictures, templateId) {
    var template = document.getElementById(templateId).content;
    var div = document.querySelector(container);
    for (var i = 0; i < pictures.length; i++) {
      var element = template.cloneNode(true);
      element.querySelector('img').src = pictures[i].url;
      element.querySelector('.picture-likes').textContent = pictures[i].likes;
      element.querySelector('.picture-comments').textContent = pictures[i].randomComments.length;
      div.appendChild(element);
    }
  };
  window.pictures = window.data.createPictures(25);
  appendPictures('.pictures', window.pictures, 'picture-template');
})();


