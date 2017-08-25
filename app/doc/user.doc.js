exports.getUserProfileDoc = async ctx => {
  /**
 * @api {GET} /v1/profiles Get User Profile
 * @apiName GetUserProfile
 * @apiGroup Profiles
 *
 * @apiHeader {String} Authorization Access-Token
 *
 * @apiDescription This End Point will return a user profiles.
 *
 * @apiSuccessExample {json} Success-Respone:
 *    HTTP 200 Ok
 *    {
 *        "id": 4,
 *         "sid": "c75ac4dd-df5c-4371-af3d-1c5b4e8c81d3",
 *         "email": "shaw.ung@pathmazing.com",
 *         "firstName": "Shaw",
 *         "lastName": "Ung",
 *         "imageUrl": "https://res.cloudinary.com/dqgbojnjw/image/upload/t_media_lib_thumb/v1503633067/photo_2017-08-17_10-30-49_hztgab.jpg",
 *         "createdAt": "2017-08-24T09:32:46.000Z",
 *         "updatedAt": "2017-08-24T09:32:46.000Z",
 *         "deletedAt": null
 *    }
 */
}

exports.updateUserProfileDoc = async ctx => {
  /**
 * @api {PUT} /v1/profiles Update User Profile
 * @apiName UpdateUserProfile
 * @apiGroup Profiles
 *
 * @apiHeader {String} Authorization Access-Token
 *
 * @apiDescription This End Point will update user profile and return a new user profiles.
 *
 * @apiParam {Int} id Id of the user.
 * @apiParam {String} sid Sid of the user.
 * @apiParam {String} email Email of the user.
 * @apiParam {String} firstName First Name of the user.
 * @apiParam {String} lastName Last Name of the user.
 * @apiParam {String} imageUrl Image path of the user.
 * @apiParam {Datetime} createAt Creat Time Stamp of the user.
 * @apiParam {Datetime} updateAt Update Time Stamp of the user.
 * @apiParam {Datetime} deleteAt Delete Time Stamp of the user.
 *
 * @apiSuccessExample {json} Success-Respone:
 *    HTTP 200 Ok
 *    {
 *        "id": 4,
 *         "sid": "c75ac4dd-df5c-4371-af3d-1c5b4e8c81d3",
 *         "email": "shaw.ung@pathmazing.com",
 *         "firstName": "Shaw",
 *         "lastName": "Ung",
 *         "imageUrl": "https://res.cloudinary.com/dqgbojnjw/image/upload/t_media_lib_thumb/v1503633067/photo_2017-08-17_10-30-49_hztgab.jpg",
 *         "createdAt": "2017-08-24T09:32:46.000Z",
 *         "updatedAt": "2017-08-24T09:32:46.000Z",
 *         "deletedAt": null
 *    }
 */
}
