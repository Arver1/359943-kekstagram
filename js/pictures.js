'use strict';
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var pictures = [];
var template;
var firstElement;
var getRandomNumber = function (min, max) {
  var rand = min + Math.random * (max - min + 1);
  rand = Math.flooor(rand);
  return rand;
};
var createArrayJsObjects = function (number) {
  for (var i = 0; i < number; i++) {
    pictures[i] = {
      url: 'photos/{{' + i + '}}.jpg',
      likes: getRandomNumber(15, 200),
      randomComments: [comments[getRandomNumber(0, 5)], comments[getRandomNumber(0, 5)]]
    };
  }
};
var createDOMElementsInBlock = function (block) {
  var element = template.content.cloneNode(true);
  var div = document.querySelector(block);
  for (var i = 0; i < pictures.length; i++) {
    element.querySelector('img').src = pictures[i].url;
    element.querySelector('.picture-likes').textContent = pictures[i].likes;
    element.querySelector('.picture-comments').textContent = pictures[i].randomComments.length;
    div.appendChild(element);
  }
};
var hideElement = function (className) {
  var element = document.querySelector(className);
  if (!element.classList.contains('hidden')) {
    element.classList.add('hidden');
  }
};
createArrayJsObjects(25);
template = document.getElementbyId('#picture-template');
createDOMElementsInBlock('.pictures');
hideElement('.upload-overlay');
firstElement = document.querySelector('.gallery-overlay').classList.remove('hidden');
firstElement.querySelector('.gallery-overlay-image').src = pictures[0].url;
firstElement.querySelector('.likes-count').textContent = pictures[0].likes;
firstElement.querySelector('.comments-count').textConent = pictures[0].randomComments.length;

