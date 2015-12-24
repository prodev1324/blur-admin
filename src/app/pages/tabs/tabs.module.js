/**
 * @author v.lugovsky
 * created on 21.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tabs', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('tabs', {
          url: '/tabs',
          templateUrl: 'app/pages/tabs/tabs.html'
        });
  }

})();
