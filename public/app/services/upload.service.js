SevakamApp.factory('UploadService', function ($http, SERVER) {
  var uploadService = {}
  uploadService.uploadImage = function (data) {
    return $http({
      method: 'POST',
      url: SERVER.api + 'upload/images',
      data: data.data,
      headers: {
        transformRequest: angular.identity,
        'Content-Type': undefined
      }
    }).then(
      function successCallback (res) {
        return res.data
      },
      function errorCallback (res) {
        return res.data
      }
    )
  }
  return uploadService
})
