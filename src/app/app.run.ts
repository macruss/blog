/// <reference path="../../typings/tsd.d.ts" />
interface IAppCookies {
  userId: string;
}

((): void => {
  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = [
    '$rootScope',
    '$cookies'
  ];

  function run($rootScope: ng.IRootScopeService,
    $cookies: IAppCookies): void {
    $rootScope.$on('$routChangeError', (): void => {

    });
    var userId = $cookies.userId;
  }
})();