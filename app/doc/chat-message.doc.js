exports.sendMessageDoc = async ctx => {
  /**
    * @api {POST} /v1/chats/:id/messages Send message in chat.
    *  @apiDescription
    * After an sucessful request will fire event <code>SendMessage</code> socket of <code>/chat</code>.
    * With chat message object as a payload.
    *
    * @apiHeader {String} Authorization JWT token of user.
    *
    * @apiName sendMessage
    * @apiGroup ChatMessage
    *
    * @apiParam {Number} id Chats unique ID.
    *
    * @apiSuccessExample {json} Response (example):
    {
        "id": 1,
        "content": null,
        "imageUrl": null,
        "videoUrl": null,
        "chatId": 1,
        "userID": 2
    }
  */
}
exports.editMessageDoc = async ctx => {
  /**
    * @api {PUT} /v1/chats/:id/message/:messageId Update message in chat.
    *  @apiDescription
    * After an sucessful request will fire event <code>EditMessage</code> socket of <code>/chat</code>.
    * With chat message object as a payload.
    *
    * @apiHeader {String} Authorization JWT token of user.
    *
    * @apiName editMessage
    * @apiGroup ChatMessage
    *
    * @apiParam {Number} id Chats unique ID.
    * @apiParam {Number} messageId Chat message id to be updated.
    *
    * @apiSuccessExample {json} Response (example):
    {
        "message": "success",
        "status": 200
    }
  */
}
exports.deleteMessageDoc = async ctx => {
  /**
    * @api {DELETE} /v1/chats/:id/message/:messageId Delete message in chat.
    *  @apiDescription
    * After an sucessful request will fire event <code>DeleteMessage</code> socket of <code>/chat</code>.
    * With chat message object as a payload.
    *
    * @apiHeader {String} Authorization JWT token of user.
    *
    * @apiName deleteMessage
    * @apiGroup ChatMessage
    *
    * @apiParam {Number} id Chats unique ID.
    * @apiParam {Number} messageId Chat message id to be deleted.
    *
    * @apiSuccessExample {json} Response (example):
    {
        "message": "success",
        "status": 200
    }
  */
}
