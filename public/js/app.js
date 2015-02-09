'use strict';

/* App Module */

var phonebookApp = angular.module('phonebookApp', ['ngRoute', 'phonebookControllers', 'xeditable', 'phonebookFilters']);

phonebookApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/persons', {
        templateUrl: 'views/partials/persons-list.html',
        controller: 'PersonsListCtrl'
      }).
      when('/persons/add', {
        templateUrl: 'views/partials/add-person.html',
        controller: 'PersonAddCtrl'
      }).
      otherwise({
        redirectTo: '/persons'
      });
  }]);

phonebookApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});