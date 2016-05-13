/**
 * @author v.lugovsky
 * created on 03.05.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('baSidebarToggleMenu', baSidebarToggleMenu)
      .directive('baSidebarCollapseMenu', baSidebarCollapseMenu)
      .directive('baSidebarTogglingItem', baSidebarTogglingItem)
      .directive('baUiSrefTogglingSubmenu', baUiSrefTogglingSubmenu)
      .directive('baUiSrefToggler', baUiSrefToggler);

  /** @ngInject */
  function baSidebarToggleMenu(baSidebarService) {
    return {
      restrict: 'A',
      link: function(scope, elem) {
        elem.on('click', function($evt) {
          $evt.originalEvent.$sidebarEventProcessed = true;
          scope.$apply(function() {
            baSidebarService.toggleMenuCollapsed();
          });
        });
      }
    };
  }

  /** @ngInject */
  function baSidebarCollapseMenu(baSidebarService) {
    return {
      restrict: 'A',
      link: function(scope, elem) {
        elem.on('click', function($evt) {
          $evt.originalEvent.$sidebarEventProcessed = true;
          if (!baSidebarService.isMenuCollapsed()) {
            scope.$apply(function() {
              baSidebarService.setMenuCollapsed(true);
            });
          }
        });
      }
    };
  }

  /** @ngInject */
  function baSidebarTogglingItem($state, baSidebarService) {
    return {
      restrict: 'A',
      controller: function ($scope, $element, $attrs) {
        var vm = this;
        var menuItem = vm.$$menuItem = $scope.$eval($attrs.baSidebarTogglingItem);
        if (menuItem && menuItem.subMenu && menuItem.subMenu.length) {
          vm.$$expandSubmenu = function() { console.warn('$$expandMenu should be overwritten by baUiSrefTogglingSubmenu') };
          vm.$$collapseSubmenu = function() { console.warn('$$collapseSubmenu should be overwritten by baUiSrefTogglingSubmenu') };

          var subItemsStateRefs = baSidebarService.getAllStateRefsRecursive(menuItem);

          vm.$expand = function() {
            vm.$$expandSubmenu();
            $element.addClass('ba-sidebar-item-expanded');
          };

          vm.$collapse = function() {
            vm.$$collapseSubmenu();
            $element.removeClass('ba-sidebar-item-expanded');
          };

          vm.$toggle = function() {
            $element.hasClass('ba-sidebar-item-expanded') ?
                vm.$collapse() :
                vm.$expand();
          };

          if (_isState($state.current)) {
            $element.addClass('ba-sidebar-item-expanded');
          }

          $scope.$on('$stateChangeStart', function (event, toState) {
            if (!_isState(toState) && $element.hasClass('ba-sidebar-item-expanded')) {
              vm.$collapse();
              $element.removeClass('ba-sidebar-item-expanded');
            }
          });

          $scope.$on('$stateChangeSuccess', function (event, toState) {
            if (_isState(toState) && !$element.hasClass('ba-sidebar-item-expanded')) {
              vm.$expand();
              $element.addClass('ba-sidebar-item-expanded');
            }
          });
        }

        function _isState(state) {
          return state && subItemsStateRefs.some(function(subItemState) {
                return state.name.indexOf(subItemState) == 0;
              });
        }
      }
    };
  }

  /** @ngInject */
  function baUiSrefTogglingSubmenu($state) {
    return {
      restrict: 'A',
      require: '^baSidebarTogglingItem',
      link: function(scope, el, attrs, baSidebarTogglingItem) {
        baSidebarTogglingItem.$$expandSubmenu = function() { el.slideDown(); };
        baSidebarTogglingItem.$$collapseSubmenu = function() { el.slideUp(); };
      }
    };
  }

  /** @ngInject */
  function baUiSrefToggler() {
    return {
      restrict: 'A',
      require: '^baSidebarTogglingItem',
      link: function(scope, el, attrs, baSidebarTogglingItem) {
        el.on('click', function() {
          baSidebarTogglingItem.$toggle();
        });
      }
    };
  }

})();
