/**
 * @author v.lugovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .directive('baPanelBlur', baPanelBlur);

  /** @ngInject */
  function baPanelBlur(baPanelBlurHelper, $window, $document) {
    var bodyBgSize;

    baPanelBlurHelper.bodyBgLoad().then(function() {
      bodyBgSize = baPanelBlurHelper.getBodyBgImageSizes();
    });

    $window.addEventListener('resize', function() {
      bodyBgSize = baPanelBlurHelper.getBodyBgImageSizes();
    });

    return {
      restrict: 'A',
      link: function($scope, elem) {
        baPanelBlurHelper.bodyBgLoad().then(function() {
          setTimeout(recalculatePanelStyle);
        });
        $document.on('scroll', recalculatePanelStyle);
        $window.addEventListener('resize', recalculatePanelStyle);

        $scope.$on('$destroy', function() {
          $window.removeEventListener('resize', recalculatePanelStyle);
        });

        function recalculatePanelStyle() {
          console.log(bodyBgSize);
          if (!bodyBgSize) {
            return;
          }
          var position = elem[0].getBoundingClientRect();
          console.log(position);
          elem.css({
            backgroundSize: Math.round(bodyBgSize.width) + 'px ' + Math.round(bodyBgSize.height) + 'px',
            backgroundPosition: Math.floor(-position.left + bodyBgSize.positionX) + 'px ' + Math.floor(-position.top + bodyBgSize.positionY) + 'px'
          });
        }

      }
    };
  }

})();
