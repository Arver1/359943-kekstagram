'use strict';
(function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadEffectLevelPin = uploadOverlay.querySelector('.upload-effect-level-pin');
  var uploadEffectLine = uploadOverlay.querySelector('.upload-effect-level-line');
  var uploadEffectVal = uploadOverlay.querySelector('.upload-effect-level-val');
  var uploadResizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');
  var effectImagePreview = uploadOverlay.querySelector('.effect-image-preview');
  var uploadEffectLevel = uploadOverlay.querySelector('.upload-effect-level');
  var startCoordsX;
  var classFilterName;
  var resetEffectLevelDefault = function () {
    switch (classFilterName) {
      case 'effect-chrome': {
        effectImagePreview.style.filter = 'grayscale(100%)';
        break;
      }
      case 'effect-sepia': {
        effectImagePreview.style.filter = 'sepia(100%)';
        break;
      }
      case 'effect-marvin': {
        effectImagePreview.style.filter = 'invert(100%)';
        break;
      }
      case 'effect-phobos': {
        effectImagePreview.style.filter = 'blur(3px)';
        break;
      }
      case 'effect-heat': {
        effectImagePreview.style.filter = 'brightness(3)';
        break;
      }
    }
    uploadEffectLevelPin.style.left = uploadEffectLine.offsetWidth + 'px';
    uploadEffectVal.style.width = uploadEffectLine.offsetWidth + 'px';
    uploadResizeControlsValue.value = '100%';
  };
  window.initializeFilters = {
    uploadEffectControl: function (evt) {
      effectImagePreview.style = 'none';
      effectImagePreview.setAttribute('class', 'effect-image-preview');
      var target = evt.target;
      if (target.value === 'none') {
        uploadEffectLevel.classList.add('hidden');
      } else {
        uploadEffectLevel.classList.remove('hidden');
        classFilterName = 'effect-' + target.value;
        effectImagePreview.classList.add(classFilterName);
        resetEffectLevelDefault();
        uploadEffectLevelPin.addEventListener('mousedown', function (downEvt) {
          startCoordsX = downEvt.clientX;
          var onEffectLevelMove = function (moveEvt) {
            var shift = moveEvt.clientX - startCoordsX;
            startCoordsX = moveEvt.clientX;
            var temp = uploadEffectLevelPin.offsetLeft + shift;
            var rect = uploadEffectLine.getBoundingClientRect().left;
            if (temp >= 0 && temp <= uploadEffectLine.offsetWidth && moveEvt.clientX >= rect && moveEvt.clientX <= rect + uploadEffectLine.offsetWidth) {
              uploadEffectLevelPin.style.left = uploadEffectLevelPin.offsetLeft + shift + 'px';
              uploadEffectLevelPin.style.opacity = '0.1';
              uploadEffectVal.style.width = uploadEffectLevelPin.offsetLeft + 'px';
              switch (classFilterName) {
                case 'effect-chrome': {
                  effectImagePreview.style.filter = 'grayscale(' + uploadEffectVal.offsetWidth * 100 / uploadEffectLine.offsetWidth + '%)';
                  break;
                }
                case 'effect-sepia': {
                  effectImagePreview.style.filter = 'sepia(' + uploadEffectVal.offsetWidth * 100 / uploadEffectLine.offsetWidth + '%)';
                  break;
                }
                case 'effect-marvin': {
                  effectImagePreview.style.filter = 'invert(' + uploadEffectVal.offsetWidth * 100 / uploadEffectLine.offsetWidth + '%)';
                  break;
                }
                case 'effect-phobos': {
                  effectImagePreview.style.filter = 'blur(' + 3 / uploadEffectLine.offsetWidth * uploadEffectVal.offsetWidth + 'px)';
                  break;
                }
                case 'effect-heat': {
                  uploadOverlay.querySelector('.effect-heat').style.filter = 'brightness(' + 3 / uploadEffectLine.offsetWidth * uploadEffectVal.offsetWidth + ')';
                  break;
                }
              }
            }
          };
          var onEffectLevelUp = function () {
            document.removeEventListener('mousemove', onEffectLevelMove);
            document.removeEventListener('mouseup', onEffectLevelUp);
          };
          document.addEventListener('mousemove', onEffectLevelMove);
          document.addEventListener('mouseup', onEffectLevelUp);
        });
      }
    },
    applyFilter: function (filterElement, callback) {
      if (callback) {
        document.querySelector(filterElement).addEventListener('change', callback);
      }
    }
  };
})();
