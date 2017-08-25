exports.createChatDoc = async ctx => {
  /**
    * @api {POST} /v1/chats Create Chat
    * @apiName CreateChat
    * @apiGroup Chat
    *
    * @apiHeader {String} Authorization Access-Token
    *
    * @apiDescription This End Point will create chat with invite user and return chat with user list in the chat.
    *
    * @apiParam {ArrayInt} userChatIds Array of the user that you want to invite to chat.
    * @apiParam {String} [title="Dafault Title"] Title of the chat.
    * @apiParam {String} [imgUrl] Image of the chat.
    *
    * @apiSuccessExample {json} Success-Respone:
    * HTTP 200 Ok
    *   {
    *    "chat": {
    *        "title": "Default Chat",
    *        "id": 34,
    *        "createdBy": 4,
    *        "updatedAt": "2017-08-25T07:16:14.252Z",
    *        "createdAt": "2017-08-25T07:16:14.252Z"
    *    },
    *    "userChats": [
    *        {
    *            "userId": 2,
    *            "chatId": 34
    *        },
    *        {
    *            "userId": 1,
    *            "chatId": 34
    *        },
    *        {
    *            "userId": 4,
    *            "chatId": 34
    *        }
    *    ],
    *    "User": {
    *        "id": 4,
    *        "sid": "c75ac4dd-df5c-4371-af3d-1c5b4e8c81d3",
    *        "email": "shaw.ung@pathmazing.com",
    *        "firstName": "Shaw",
    *        "lastName": "Ung",
    *        "imageUrl":          "https://res.cloudinary.com/dqgbojnjw/image/upload/t_media_lib_thumb/v1503633067/photo_2017-08-17_10-30-49_hztgab.jpg",
    *        "createdAt": "2017-08-24T09:32:46.000Z",
    *        "updatedAt": "2017-08-25T04:11:47.000Z",
    *        "deletedAt": null,
    *        "screenName": "Shaw Ung"
    *    }
  */
}

exports.inviteUserChatDoc = async ctx => {
  /**
    * @api {POST} /v1/chats/:id/invites Invite User To Chat
    * @apiName InviteUserToChat
    * @apiGroup Chat
    *
    * @apiHeader {String} Authorization Access-Token
    *
    * @apiDescription This End Point will invite new user to chat with and return chat with user list in the chat.
    *
    * @apiParam {ArrayInt} userChatIds Array of the user that you want to invite to chat.
    *
    * @apiSuccessExample {json} Success-Respone:
    * HTTP 200 Ok
    *   {
    *    "chat": {
    *        "title": "Default Chat",
    *        "id": 34,
    *        "createdBy": 4,
    *        "updatedAt": "2017-08-25T07:16:14.252Z",
    *        "createdAt": "2017-08-25T07:16:14.252Z"
    *    },
    *    "userChats": [
    *        {
    *            "userId": 2,
    *            "chatId": 34
    *        },
    *        {
    *            "userId": 1,
    *            "chatId": 34
    *        },
    *        {
    *            "userId": 4,
    *            "chatId": 34
    *        }
    *    ],
    *    "User": {
    *        "id": 4,
    *        "sid": "c75ac4dd-df5c-4371-af3d-1c5b4e8c81d3",
    *        "email": "shaw.ung@pathmazing.com",
    *        "firstName": "Shaw",
    *        "lastName": "Ung",
    *        "imageUrl":          "https://res.cloudinary.com/dqgbojnjw/image/upload/t_media_lib_thumb/v1503633067/photo_2017-08-17_10-30-49_hztgab.jpg",
    *        "createdAt": "2017-08-24T09:32:46.000Z",
    *        "updatedAt": "2017-08-25T04:11:47.000Z",
    *        "deletedAt": null,
    *        "screenName": "Shaw Ung"
    *    }
  */
}

exports.kickUserChatDoc = async ctx => {
  /**
    * @api {POST} /v1/chats/:id/invites Kick User From Chat
    * @apiName KickUserToChat
    * @apiGroup Chat
    *
    * @apiHeader {String} Authorization Access-Token
    *
    * @apiDescription This End Point will kcik user from chat and return chat with user list in the chat.
    *
    * @apiParam {ArrayInt} userChatIds Array of the user that you want to kick from chat.
    *
    * @apiSuccessExample {json} Success-Respone:
    * HTTP 200 Ok
    *   {
    *    "chat": {
    *        "title": "Default Chat",
    *        "id": 34,
    *        "createdBy": 4,
    *        "updatedAt": "2017-08-25T07:16:14.252Z",
    *        "createdAt": "2017-08-25T07:16:14.252Z"
    *    },
    *    "userChats": [
    *        {
    *            "userId": 2,
    *            "chatId": 34
    *        },
    *        {
    *            "userId": 1,
    *            "chatId": 34
    *        },
    *        {
    *            "userId": 4,
    *            "chatId": 34
    *        }
    *    ],
    *    "User": {
    *        "id": 4,
    *        "sid": "c75ac4dd-df5c-4371-af3d-1c5b4e8c81d3",
    *        "email": "shaw.ung@pathmazing.com",
    *        "firstName": "Shaw",
    *        "lastName": "Ung",
    *        "imageUrl":          "https://res.cloudinary.com/dqgbojnjw/image/upload/t_media_lib_thumb/v1503633067/photo_2017-08-17_10-30-49_hztgab.jpg",
    *        "createdAt": "2017-08-24T09:32:46.000Z",
    *        "updatedAt": "2017-08-25T04:11:47.000Z",
    *        "deletedAt": null,
    *        "screenName": "Shaw Ung"
    *    }
  */
}
