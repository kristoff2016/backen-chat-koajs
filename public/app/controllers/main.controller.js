SevakamApp.controller('MainController', function ($scope, $rootScope, $window) {
  var localUserAuth = localStorage.userAuth
  if (localUserAuth) {
    $rootScope.userAuth = JSON.parse(localUserAuth)
  } else {
    location.href = '/login.html'
  }
})
