(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form')
      .controller('WizardCtrl', WizardCtrl)
      .directive('baWizard', baWizard)
      .directive('baWizardTab', baWizardTab);

  /** @ngInject */
  function WizardCtrl($scope, $location, $sce) {
   var vm = this;

    vm.personalInfo = {};
    vm.productInfo = {};
    vm.paymentForm = {};
    vm.finishForm = {};

  }

  function baWizard() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/pages/form/wizard/wizard.html',
      controllerAs: '$baWizardController',
      controller: ['$scope', function ($scope) {
        var vm = this;
        vm.tabs = [];

        vm.tabNum = 0;
        vm.progress = 0;

        vm.addTab = function(tab) {
          tab.setPrev(vm.tabs[vm.tabs.length - 1]);
          vm.tabs.push(tab);
          vm.selectTab(0);
        };

        $scope.$watch(angular.bind(vm, function () {return vm.tabNum;}), countProgress);

        vm.selectTab = function (tabNum) {
          if (vm.tabs[tabNum].isAvailiable()) {
            vm.tabNum = tabNum;
            vm.tabs.forEach(function (t, tIndex) {
              tIndex == vm.tabNum ? t.select(true) : t.select(false);
            });
          }
        };

        vm.isFirstTab = function () {
          return vm.tabNum == 0;
        };

        vm.isLastTab = function () {
          return vm.tabNum == vm.tabs.length - 1 ;
        };

        vm.nextTab = function () {
          vm.selectTab(vm.tabNum + 1)
        };

        vm.previousTab = function () {
          vm.selectTab(vm.tabNum - 1)
        };

        function countProgress() {
          vm.progress = ((vm.tabNum + 1) / vm.tabs.length) * 100;
        }
      }]
    }
  }

  function baWizardTab() {
    return {
      restrict: 'E',
      transclude: true,
      require: '^baWizard',
      scope: {
        completeness: '='
      },
      templateUrl:  'app/pages/form/wizard/tab.html',
      link: function($scope, $element, $attrs, wizard) {
        $scope.selected = true;

        var tab = {
          title: $attrs.title,
          select: select,
          isComplete: isComplete,
          isAvailiable: isAvailiable,
          prevTab: undefined,
          setPrev: setPrev
        };

        wizard.addTab(tab);

        function select(isSelected) {
          if (isSelected) {
            $scope.selected = true;
          } else {
            $scope.selected = false;
          }
        }

        function isComplete() {
          return $scope.completeness;
        }

        function isAvailiable() {
          return tab.prevTab ? tab.prevTab.isComplete() : true;
        }

        function setPrev(pTab) {
          tab.prevTab = pTab;
        }
      }
    };
  }

})();

