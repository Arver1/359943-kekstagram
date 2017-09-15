'use strict';
(function () {
  var div = document.querySelector('.pictures');
  var template = document.getElementById('picture-template').content;
  var filter = document.querySelector('.filters');
  var updatePictures = function (sortPictures) {
    div.innerHTML = '';
    for (var i = 0; i < sortPictures.length; i++) {
      var element = template.cloneNode(true);
      element.querySelector('img').src = sortPictures[i].url;
      element.querySelector('.picture-likes').textContent = sortPictures[i].likes;
      element.querySelector('.picture-comments').textContent = sortPictures[i].comments.length;
      div.appendChild(element);
    }
  };
  var appendPictures = function (pictures, callback) {
    var sortPictures = pictures;
    filter.classList.remove('hidden');
    filter.addEventListener('change', function (evt) {
      sortPictures = pictures.slice(0);
      switch (evt.target.value) {
        case 'popular': {
          sortPictures.sort(function (first, second) {
            if (first.likes < second.likes) {
              return 1;
            } else if (first.likes > second.likes) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        }
        case 'discussed': {
          sortPictures.sort(function (first, second) {
            if (first.comments.length < second.comments.length) {
              return 1;
            } else if (first.comments.length > second.comments.length) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        }
        case 'random': {
          sortPictures.sort(function (first, second) {
            return Math.random() - 0.5;
          });
          break;
        }
        case 'recommend': {
          break;
        }
      }
      window.debounce(function () {
        updatePictures(sortPictures);
      }, 500);
    });
    for (var i = 0; i < sortPictures.length; i++) {
      var element = template.cloneNode(true);
      element.querySelector('img').src = sortPictures[i].url;
      element.querySelector('.picture-likes').textContent = sortPictures[i].likes;
      element.querySelector('.picture-comments').textContent = sortPictures[i].comments.length;
      div.appendChild(element);
    }
  };
  window.backend.load(appendPictures, window.util.onError);
})();
