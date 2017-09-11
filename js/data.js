'use strict';
(function () {
  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  window.data = {
    createPictures: function (countPictures) {
      var pictures = [];
      for (var i = 0; i < countPictures; i++) {
        pictures[i] = {
          url: './photos/' + i + '.jpg',
          likes: window.util.getRandomNumber(15, 200),
          randomComments: [comments[window.util.getRandomNumber(0, 5)], comments[window.util.getRandomNumber(0, 5)]]
        };
      }
      return pictures;
    }
  };
})();
