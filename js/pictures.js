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
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
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
var pictures = createPictures(25);
appendPictures('.pictures', pictures, 'picture-template');
hideElement('.upload-overlay');
galleryOverlay.classList.remove('hidden');
galleryOverlay.querySelector('.gallery-overlay-image').src = pictures[0].url;
galleryOverlay.querySelector('.likes-count').textContent = pictures[0].likes;
galleryOverlay.querySelector('.comments-count').textContent = pictures[0].randomComments.length;
var picture = document.querySelectorAll('.picture');
var closePopup = function () {
  galleryOverlay.classList.add('hidden');
}
var openPopup = function (evt) {
  alert(evt.currentTarget + ' ' + evt.target);


  galleryOverlay.classList.remove('hidden');
  galleryOverlay.querySelector('.gallery-overlay-image').src = evt.target.currentSrc;

};

for (var i = 0; i < picture.length; i++) {
  picture[i].addEventListener('click', openPopup);
}
galleryOverlayClose.addEventListener('click', closePopup);

