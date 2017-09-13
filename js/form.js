'use strict';
(function () {
  var uploadForm = document.querySelector('.upload-form');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var effectImagePreview = uploadOverlay.querySelector('.effect-image-preview');
  var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
  var textAreaUploadOverlay = uploadOverlay.querySelector('.upload-form-description');
  var uploadFormDescription = uploadOverlay.querySelector('.upload-form-description');
  var uploadFormHashtags = uploadOverlay.querySelector('.upload-form-hashtags');
  var uploadImage = uploadForm.querySelector('.upload-file');
  var uploadEffectLevel = uploadForm.querySelector('.upload-effect-level');
  var uploadOverlayFocus = 0;
  var sendForm = function (evt) {
    var hashTemp;
    var temp = uploadFormHashtags.value;
    if (temp.length < 2 || temp.length > 104) {
      evt.preventDefault();
      uploadFormHashtags.style.border = '2px solid red';
    } else {
      temp = temp.split(' ');
      if (temp.length === 1) {
        temp = temp[0];
        hashTemp = temp.split('#');
        if (temp.length > 19 || temp[0] !== '#' || hashTemp.length > 2) {
          uploadFormHashtags.style.border = '2px solid red';
          evt.preventDefault();
        }
      } else {
        for (var i = 0; i < temp.length; i++) {
          hashTemp = temp[i].split('#');
          if (temp[i][0] !== '#' || temp[i].length > 19 || temp[i].length < 2 || hashTemp.length > 2) {
            uploadFormHashtags.style.border = '2px solid red';
            evt.preventDefault();
            break;
          }
        }
        for (i = 0; i < temp.length; i++) {
          for (var j = i + 1; j < temp.length; j++) {
            if (temp[i] === temp[j]) {
              uploadFormHashtags.style.border = '2px solid red';
              evt.preventDefault();
              i = temp.length + 1;
              break;
            }
          }
        }
      }
    }
    uploadForm.reset();
    effectImagePreview.setAttribute('class', 'effectImagePreview');
    effectImagePreview.style.transform = 'scale(1)';
  };
  var uploadEsc = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE && uploadOverlayFocus === 0) {
      uploadClosePopup();
    }
  };
  var uploadEscBan = function () {
    uploadOverlayFocus = 1;
  };
  var uploadEscAllow = function () {
    uploadOverlayFocus = 0;
  };
  var uploadClosePopup = function () {
    uploadOverlay.classList.add('hidden');
    uploadImage.classList.remove('hidden');
    uploadFormCancel.removeEventListener('click', uploadClosePopup);
    document.removeEventListener('keydown', uploadEsc);
    textAreaUploadOverlay.removeEventListener('focus', uploadEscBan);
    textAreaUploadOverlay.removeEventListener('blur', uploadEscAllow);
  };
  uploadFormDescription.addEventListener('invalid', function () {
    if (uploadFormDescription.validity.tooShort) {
      uploadFormDescription.setCustomValidity('Минимальная длина — 30 символов');
      uploadFormDescription.style.border = '2px solid red';
    } else if (uploadFormDescription.validity.tooLong) {
      uploadFormDescription.setCustomValidity('Максимальная длина — 100 символов');
      uploadFormDescription.style.border = '2px solid red';
    } else if (uploadFormDescription.validity.valueMissing) {
      uploadFormDescription.setCustomValidity('Обязательное поле');
      uploadFormDescription.style.border = '2px solid red';
    } else {
      uploadFormDescription.setCustomValidity('');
    }
  });
  uploadFormHashtags.addEventListener('click', function () {
    uploadFormHashtags.style.border = '';
  });
  uploadFormDescription.addEventListener('click', function () {
    uploadFormDescription.style.border = '';
  });
  window.initializeScale.adJustScale('.upload-resize-controls', window.initializeScale.uploadSizeControl);
  window.initializeFilters.applyFilter('.upload-effect-controls', window.initializeFilters.uploadEffectControl);
  uploadForm.addEventListener('submit', sendForm);
  window.form = {
    uploadOpenPopup: function () {
      uploadEffectLevel.classList.add('hidden');
      uploadImage.classList.add('hidden');
      uploadOverlay.classList.remove('hidden');
      uploadFormCancel.addEventListener('click', uploadClosePopup);
      document.addEventListener('keydown', uploadEsc);
      textAreaUploadOverlay.addEventListener('focus', uploadEscBan);
      textAreaUploadOverlay.addEventListener('blur', uploadEscAllow);
    }
  };
})();
