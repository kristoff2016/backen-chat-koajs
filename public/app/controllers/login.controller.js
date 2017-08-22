SevakamApp.controller('LoginController', function ($scope, $rootScope, AuthService, UploadService, $http, $location) {
  if ($rootScope.userAuth) {
    location.href = '/index.html'
  }
  $scope.credentials = {
    email: '',
    code: '',
    firstname: '',
    lastname: ''
  }
  /**
 * step enter email address
 */
  $scope.loading = false
  $rootScope.checkLogin = false
  $rootScope.checkInfo = false
  $scope.selection = 'email'
  $rootScope.imageUrl = 'img/avatar_default.jpg'
  $scope.login = function (credentials) {
    $scope.loading = true
    if ($rootScope.checkLogin === false) {
      if (!credentials.email) {
        $scope.msgSuccess = false
        $scope.loading = false
        $scope.msg = 'Please enter your email'
        return
      }
      // first step send code to eamil address
      AuthService.firstStep(credentials).then(function (res) {
        if (res.status === 200) {
          $scope.loading = false
          $scope.msgSuccess = true
          $scope.msg = res.message
          $scope.selection = 'code'
          $rootScope.checkLogin = true
        }
      })
    } else {
      if ($rootScope.checkInfo === false) {
        if (!credentials.code) {
          $scope.msgSuccess = false
          $scope.loading = false
          $scope.msg = 'Please enter your code'
          return
        }
        AuthService.login(credentials).then(function (res) {
          if (res.status === 200) {
            $scope.msg = 'Login success'
            $scope.msgSuccess = true
            $scope.loading = false
            $scope.selection = 'fullname'
            $rootScope.checkInfo = true
          }
        })
      } else {
        if (!credentials.firstname) {
          $scope.msgSuccess = false
          $scope.loading = false
          $scope.msg = 'Please enter your firstname'
          return
        } else if (!credentials.lastname) {
          $scope.msgSuccess = false
          $scope.loading = false
          $scope.msg = 'Please enter your lastname'
          return
        } else if (!$rootScope.imageUrl) {
          $scope.msgSuccess = false
          $scope.loading = false
          $scope.msg = 'Please upload your profile'
          return
        }
        AuthService.profiles(credentials).then(function (res) {
          if (res.status === 200) {
          }
        })
        // localStorage.setItem('userAuth', JSON.stringify(res))
      }
    }
  }
  /**
   *  on upload image
   */

  $scope.uploadImage = function () {
    $('#upload-image').click()
  }
  $scope.onUploadImageChat = function () {
    var file = document.getElementById('upload-image').files[0]
    var fd = new FormData($('#form-private-chat')[0])
    fd.append('file', file)
    UploadService.uploadImage({
      data: fd
    }).then(function (res) {
      $rootScope.imageUrl = res.url
    })
  }
  $scope.onCloseMessage = function () {
    $scope.msg = undefined
  }
})
