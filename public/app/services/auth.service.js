SevakamApp.factory('AuthService', function ($http, SERVER) {
  var authService = {}

  authService.login = function (credentials) {
    return $http({
      method: 'POST',
      url: SERVER.api + 'login/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: credentials
    }).then(
      function successCallback (res) {
        return res.data
      },
      function errorCallback (res) {
        return res.data
      }
    )
  }
  authService.profiles = function (credentials, token) {
    return $http({
      method: 'PUT',
      url: SERVER.api + 'profiles',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      data: credentials
    }).then(
      function successCallback (res) {
        return res.data
      },
      function errorCallback (res) {
        return res.data
      }
    )
  }
  authService.firstStep = function (credentials) {
    return $http({
      method: 'POST',
      url: SERVER.api + 'login/code',
      headers: {
        'Content-Type': 'application/json'
      },
      data: credentials
    }).then(
      function successCallback (res) {
        return res.data
      },
      function errorCallback (res) {
        return res.data
      }
    )
  }

  return authService
})
