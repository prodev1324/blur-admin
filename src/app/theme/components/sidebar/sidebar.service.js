(function() {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .service('sidebarService', sidebarService);

  /** @ngInject */
  function sidebarService($state) {
    var staticMenuItems = [ {
        title: 'Auth Pages',
        icon: 'ion-log-out',
        subMenu: [{
            title: 'Sign In',
            root: 'auth.html'
          }, {
            title: 'Sign Up',
            root: 'reg.html'
          }]
      }, {
        title: '404 Page',
        icon: 'ion-document',
        root: '404.html'
      }, {
        title: 'Menu Level 1',
        icon: 'ion-ios-more',
        subMenu: [{
            title: 'Menu Level 1.1'
          }, {
            title: 'Menu Level 1.2',
            subMenu: [{
              title: 'Menu Level 1.2.1'
            }]
          }]
    }];

    this.getMenuItems = function() {
      var states = defineMenuItemStates();
      var menuItems = states.filter(function(item) {
        return item.level == 0;
      });

      menuItems.forEach(function(item) {
        var children = states.filter(function(child) {
          return child.level == 1 && child.name.indexOf(item.name) === 0;
        });
        item.subMenu = children.length ? children : null;
      });

      return menuItems.concat(staticMenuItems);
    };

    function defineMenuItemStates() {
      return $state.get()
          .filter(function(s) {
            return s.sidebarMeta;
          })
          .map(function(s) {
            var meta = s.sidebarMeta;
            return {
              name: s.name,
              title: s.title,
              level: (s.name.match(/\./g) || []).length,
              order: meta.order,
              icon: meta.icon,
              root: '#/' + s.name.replace('.', '/'),
            };
          })
          .sort(function(a, b) {
            return (a.level - b.level) * 100 + a.order - b.order;
          });
    }
  }
})();
