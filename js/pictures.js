'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var picture = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
var galleryOverlayImage = galleryOverlay.querySelector('.gallery-overlay-image');
var galleryLikesCount = galleryOverlay.querySelector('.likes-count');
var galleryCommentsCount = galleryOverlay.querySelector('.comments-count');
var uploadImage = document.querySelector('.upload-file');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
var textAreaUploadOverlay = uploadOverlay.querySelector('.upload-form-description');
var uploadOverlayFocus = 0;
var uploadFormDescription = uploadOverlay.querySelector('.upload-form-description');
var uploadResizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');
var uploadResizeControls = uploadOverlay.querySelector('.upload-resize-controls');
var effectImagePreview = uploadOverlay.querySelector('.effect-image-preview');
var uploadEffectControls = uploadOverlay.querySelector('.upload-effect-controls');
var uploadFormHashtags = uploadOverlay.querySelector('.upload-form-hashtags');
var uploadForm = document.querySelector('.upload-form');
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};
var hideElement = function (className) {
  document.querySelector(className).classList.add('hidden');
};
var createPictures = function (countPictures) {
  var pictures = [];
  for (var i = 0; i < countPictures; i++) {
    pictures[i] = {
      url: './photos/' + i + '.jpg',
      likes: getRandomNumber(15, 200),
      randomComments: [comments[getRandomNumber(0, 5)], comments[getRandomNumber(0, 5)]]
    };
  }
  return pictures;
};
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
var escClosePopup = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};
var enterClosePopup = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
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
var fillGalleryOverlay = function (evt) {
  evt.preventDefault();
  var target = evt.target;
  while (!target.classList.contains('picture')) {
    target = target.parentNode;
  }
  galleryOverlayImage.src = target.querySelector('img').src;
  galleryLikesCount.textContent = target.querySelector('.picture-likes').textContent;
  galleryCommentsCount.textContent = target.querySelector('.picture-comments').textContent;
  openPopup();
};
var uploadEsc = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && uploadOverlayFocus === 0) {
    uploadClosePopup();
  }
};
var uploadEscBan = function () {
  uploadOverlayFocus = 1;
};
var uploadEscAllow = function () {
  uploadOverlayFocus = 0;
};
var uploadOpenPopup = function () {
  uploadImage.classList.add('hidden');
  uploadOverlay.classList.remove('hidden');
  uploadFormCancel.addEventListener('click', uploadClosePopup);
  document.addEventListener('keydown', uploadEsc);
  textAreaUploadOverlay.addEventListener('focus', uploadEscBan);
  textAreaUploadOverlay.addEventListener('blur', uploadEscAllow);
};
var uploadClosePopup = function () {
  uploadOverlay.classList.add('hidden');
  uploadImage.classList.remove('hidden');
  uploadFormCancel.removeEventListener('click', uploadClosePopup);
  document.removeEventListener('keydown', uploadEsc);
  textAreaUploadOverlay.removeEventListener('focus', uploadEscBan);
  textAreaUploadOverlay.removeEventListener('blur', uploadEscAllow);
};
var uploadSizeControl = function (evt) {
  var target = evt.target;
  var temp;
  if (target.classList.contains('upload-resize-controls-button-dec')) {
    temp = uploadResizeControlsValue.value.replace('%', '') - 25;
    if (temp >= 25 && temp <= 100) {
      effectImagePreview.style.transform = 'scale(' + temp / 100 + ')';
      uploadResizeControlsValue.value = temp + '%';
    }
  } else if (target.classList.contains('upload-resize-controls-button-inc')) {
    temp = uploadResizeControlsValue.value.replace('%', '') - 0 + 25;
    if (temp >= 25 && temp <= 100) {
      effectImagePreview.style.transform = 'scale(' + temp / 100 + ')';
      uploadResizeControlsValue.value = temp + '%';
    }
  }
};
var uploadEffectControl = function (evt) {
  effectImagePreview.setAttribute('class', 'effect-image-preview');
  var target = evt.target;
  while (!target.tagName.toLowerCase() === 'input') {
    target = target.parentNode;
  }
  effectImagePreview.classList.add('effect-' + target.value);
};
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
        if (temp[i][0] !== '#' || temp[i].length > 19) {
          uploadFormHashtags.style.border = '2px solid red';
          evt.preventDefault();
          break;
        }
      }
    }
  }
};
var pictures = createPictures(25);
appendPictures('.pictures', pictures, 'picture-template');
hideElement('.upload-overlay');
openPopup();
galleryOverlayImage.src = pictures[0].url;
galleryLikesCount.textContent = pictures[0].likes;
galleryCommentsCount.textContent = pictures[0].randomComments.length;
picture.addEventListener('click', fillGalleryOverlay);
picture.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    fillGalleryOverlay(evt);
  }
});
uploadImage.addEventListener('click', uploadOpenPopup);
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
uploadResizeControls.addEventListener('click', uploadSizeControl);
uploadEffectControls.addEventListener('click', uploadEffectControl);
uploadFormHashtags.addEventListener('click', function () {
  uploadFormHashtags.style.border = '';
});
uploadFormDescription.addEventListener('click', function () {
  uploadFormDescription.style.border = '';
});
uploadForm.addEventListener('submit', sendForm);

