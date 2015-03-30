angular.module('btcchina', ['btcchina-auth']);
angular.module('btcchina-auth', ['ab-base64'])
  .constant('authUrl', 'http://dev.btcchina.com/api.php/account/authenticate')
  .factory('Auth_LoginService', ['$http', 'authUrl', 'base64', function ($http, authUrl, base64) {
       return {
           login: function (user, cb) {
               var authValue = 'Basic ' + base64.encode(user.username + ":" + user.password);
               var req = {
                   method: 'POST',
                   url: authUrl,
                   headers: {
                       'Authorization': authValue,
                       'Content-Type': 'application/x-www-form-urlencoded'
                   }
               };
               return $http(req);
           }
       }
  }])
  .controller('MainCtrl', function ($scope, Auth_LoginService) {
      Auth_LoginService.login({username: 'tsq', password: 'kk'}).success(function (data) {
          $scope.data = data;
      })
  })
  .service('util', function () {
      this.isNumber = function (num) {
          return !isNaN(num);
      };
      this.isDate = function (date) {
          return (date instanceof Date);
      };
  })
  .controller('PasswordController', function ($scope) {
      $scope.password = '';
      $scope.grade = function () {
          var size = $scope.password.length;
          if (size > 8) {
              $scope.strength = 'strong';
          } else if (size > 3) {
              $scope.strength = 'medium';
          } else {
              $scope.strength = 'weak';
          }
      }
  })
  .filter('length', function () {
      return function (text) {
          return ('' + (text || '')).length;
      }
  })
  .directive('aGreatEye', function () {
      return {
          restrict: 'E',
          replace: true,
          template: '<h1>lidless, wreathed in flame, {{1 + 1}} times</h1>'
      };
  })
