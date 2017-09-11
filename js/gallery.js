'use strict';
(function () {
  var picture = document.querySelector('.pictures');
  var uploadImage = document.querySelector('.upload-file');
  uploadImage.addEventListener('click', window.form.uploadOpenPopup);
  picture.addEventListener('click', window.preview.fillGalleryOverlay);
  picture.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.preview.fillGalleryOverlay(evt);
    }
  });
})();
