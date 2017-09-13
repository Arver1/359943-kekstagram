'use strict';
(function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadResizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');
  var effectImagePreview = uploadOverlay.querySelector('.effect-image-preview');
  window.initializeScale = {
    uploadSizeControl: function (evt) {
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
    },
    adJustScale: function (scaleElement, callback) {
      if (callback) {
        document.querySelector(scaleElement).addEventListener('click', callback);
      }
    }
  };
})();

