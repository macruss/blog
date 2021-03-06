/// <reference path="../../typings/tsd.d.ts" />
((): void => {
  'use strict';

  angular
    .module('app', [
      'app.core',
      'app.layout',
      'app.services',
      'app.widgets',
      'app.blocks',
       // Features areas
      'app.blogposts',
      'app.dashboard',
      'app.sitesettings',
      'app.users',
      'app.usersettings',
     ]);
})();
