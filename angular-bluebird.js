(function(global, angular, undefined) {
  'use strict';

  function $Promise($rootScope) {
    var $promise = Promise;
    function defer() {
      var resolve, reject;
      var promise = new Promise(function(_resolve, _reject) {
        resolve = _resolve;
        reject = _reject;
      });

      return {
        resolve: resolve,
        reject: reject,
        promise: promise,
      };
    };

    $promise.defer = defer;
    $promise.when = Promise.cast;

    return $promise;
  }

  function $Run($rootScope) {
    if (Promise.setScheduler) {
      Promise.setScheduler(function (cb) {
        $rootScope.$evalAsync(cb);
      });
    }
  }

  angular.module('ngBluebird', [])
  .factory('$promise', ['$rootScope', $Promise])
  .run(['$rootScope', $Run]);


  angular.module('angular-bluebird', ['ngBluebird']);

  if (typeof module === 'object' && typeof define !== 'function') {
    module.exports = angular.module('ngBluebird');
  }

}(this, angular));
