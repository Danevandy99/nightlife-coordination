'use strict';

angular.module('workspaceApp.auth', [
  'workspaceApp.constants',
  'workspaceApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
