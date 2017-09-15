'use strict';
(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var galleryOverlayImage = galleryOverlay.querySelector('.gallery-overlay-image');
  var galleryLikesCount = galleryOverlay.querySelector('.likes-count');
  var galleryCommentsCount = galleryOverlay.querySelector('.comments-count');
  var hideElement = function (className) {
    document.querySelector(className).classList.add('hidden');
  };
  var onEscClosePopup = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };
  var onEnterClosePopup = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closePopup();
    }
  };
  var closePopup = function () {
    galleryOverlay.classList.add('hidden');
    galleryOverlayClose.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', onEscClosePopup);
    galleryOverlayClose.removeEventListener('keydown', onEnterClosePopup);
  };
  var openPopup = function () {
    galleryOverlay.classList.remove('hidden');
    galleryOverlayClose.addEventListener('click', closePopup);
    galleryOverlayClose.addEventListener('keydown', onEnterClosePopup);
    document.addEventListener('keydown', onEscClosePopup);
  };
  hideElement('.upload-overlay');
  openPopup();
  window.preview = {
    fillGalleryOverlay: function (evt) {
      evt.preventDefault();
      var target = evt.target;
      while (!target.classList.contains('picture')) {
        target = target.parentNode;
      }
      galleryOverlayImage.src = target.querySelector('img').src;
      galleryLikesCount.textContent = target.querySelector('.picture-likes').textContent;
      galleryCommentsCount.textContent = target.querySelector('.picture-comments').textContent;
      openPopup();
    },
    fillFirstOverlay: function () {
      galleryOverlayImage.src = document.querySelector('.picture').querySelector('img').src;
      galleryLikesCount.textContent = document.querySelector('.picture').querySelector('.picture-likes').textContent;
      galleryCommentsCount.textContent = document.querySelector('.pictures').querySelector('.picture-comments').textContent;
    }
  };
})();
