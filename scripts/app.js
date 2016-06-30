(function() {

  "use strict";

  angular
    .module('petAdoption', ['ngMaterial', 'ui.router', 'firebase'])
    .config(function($mdThemingProvider, $stateProvider, $urlRouterProvider) {

      $mdThemingProvider.theme('default')
        .dark()
        .primaryPalette('blue-grey')
        .accentPalette('grey');

      $urlRouterProvider.otherwise('/adoptions');

      $stateProvider
        .state('adoptions', {
          url: '/adoptions',
          templateUrl: 'components/petadoptions/petadoptions.tpl.html',
          controller: 'adoptionCtrl as vm'
        })
        .state('adoptions.new', {
          url: '/new',
          templateUrl: 'components/petadoptions/new/adoptions.new.tpl.html',
          controller: 'newAdoptionsCtrl as vm'
        })
        .state('adoptions.edit', {
          url: '/:id/edit',
          templateUrl: 'components/petadoptions/edit/adoptions.edit.tpl.html',
          controller: 'editAdoptionsCtrl as vm',
          params: {
            adoption: null
          }
        });
      });
    })();