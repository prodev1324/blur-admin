/**
 * @author v.lugovsky
 * created on 23.12.2015
 */
(function () {
  'use strict';

  /**
   * Includes basic panel layout inside of current element.
   */
  angular.module('BlurAdmin.theme')
      .directive('baPanel', baPanel);

  /** @ngInject */
  function baPanel(baPanel) {
    return angular.extend({}, baPanel, {
      template: function(el, attrs) {
        var res = '<div  class="panel panel-blur full-invisible ' + (attrs.baPanelClass || '') + '" zoom-in>';
        res += baPanel.template(el, attrs);
        res += '</div>';
        return res;
      }
    });
  }
})();
