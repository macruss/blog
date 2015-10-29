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
        '$cookies',
        'currentUser'
    ];

    function run(
        $rootScope: ng.IRootScopeService,
        $cookies: IAppCookies,
        currentUser: ICurrentUser): void {
        $rootScope.$on('$routChangeError', (): void => {
        });
        currentUser.userId = $cookies.userId;
    }
})();