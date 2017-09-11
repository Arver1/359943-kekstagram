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
  var escClosePopup = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };
  var enterClosePopup = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closePopup();
    }
  };
  var closePopup = function () {
    galleryOverlay.classList.add('hidden');
    galleryOverlayClose.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', escClosePopup);
    galleryOverlayClose.removeEventListener('keydown', enterClosePopup);
  };
  var openPopup = function () {
    galleryOverlay.classList.remove('hidden');
    galleryOverlayClose.addEventListener('click', closePopup);
    galleryOverlayClose.addEventListener('keydown', enterClosePopup);
    document.addEventListener('keydown', escClosePopup);
  };
  galleryOverlayImage.src = window.pictures[0].url;
  galleryLikesCount.textContent = window.pictures[0].likes;
  galleryCommentsCount.textContent = window.pictures[0].randomComments.length;
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
    }
  };
})();
