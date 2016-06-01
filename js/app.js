var myApp = angular.module('myApp', ['ngRoute', 'firebase'])
    .constant('FIREBASE_URL', 'https://angulardata87.firebaseio.com/');

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
        if (error === 'AUTH_REQUIRED') {
            $rootScope.message = 'Sorry, you must log in to access that page';
            $location.path('/login');
        } //AUTH REQUIRED
    }); //event info
}]); //run

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/meetings', {
      templateUrl: 'views/meetings.html',
      controller: 'MeetingsController',
      resolve: {
          currentAuth: function(Authentication) {
              return Authentication.requireAuth();
          } //currentAuth
      } //resolve
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);
