define({ "api": [
  {
    "type": "POST",
    "url": "/v1/chats",
    "title": "Create Chat",
    "name": "CreateChat",
    "group": "Chat",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access-Token</p>"
          }
        ]
      }
    },
    "description": "<p>This End Point will create chat with invite user and return chat with user list in the chat.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ArrayInt",
            "optional": false,
            "field": "userChatIds",
            "description": "<p>Array of the user that you want to invite to chat.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "defaultValue": "Dafault Title",
            "description": "<p>Title of the chat.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "imgUrl",
            "description": "<p>Image of the chat.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Respone:",
          "content": "HTTP 200 Ok\n  {\n   \"chat\": {\n       \"title\": \"Default Chat\",\n       \"id\": 34,\n       \"createdBy\": 4,\n       \"updatedAt\": \"2017-08-25T07:16:14.252Z\",\n       \"createdAt\": \"2017-08-25T07:16:14.252Z\"\n   },\n   \"userChats\": [\n       {\n           \"userId\": 2,\n           \"chatId\": 34\n       },\n       {\n           \"userId\": 1,\n           \"chatId\": 34\n       },\n       {\n           \"userId\": 4,\n           \"chatId\": 34\n       }\n   ],\n   \"User\": {\n       \"id\": 4,\n       \"sid\": \"c75ac4dd-df5c-4371-af3d-1c5b4e8c81d3\",\n       \"email\": \"shaw.ung@pathmazing.com\",\n       \"firstName\": \"Shaw\",\n       \"lastName\": \"Ung\",\n       \"imageUrl\":          \"https://res.cloudinary.com/dqgbojnjw/image/upload/t_media_lib_thumb/v1503633067/photo_2017-08-17_10-30-49_hztgab.jpg\",\n       \"createdAt\": \"2017-08-24T09:32:46.000Z\",\n       \"updatedAt\": \"2017-08-25T04:11:47.000Z\",\n       \"deletedAt\": null,\n       \"screenName\": \"Shaw Ung\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/doc/chat.doc.js",
    "groupTitle": "Chat"
  },
  {
    "type": "POST",
    "url": "/v1/chats/:id/invites",
    "title": "Invite User To Chat",
    "name": "InviteUserToChat",
    "group": "Chat",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access-Token</p>"
          }
        ]
      }
    },
    "description": "<p>This End Point will invite new user to chat with and return chat with user list in the chat.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ArrayInt",
            "optional": false,
            "field": "userChatIds",
            "description": "<p>Array of the user that you want to invite to chat.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Respone:",
          "content": "HTTP 200 Ok\n  {\n   \"chat\": {\n       \"title\": \"Default Chat\",\n       \"id\": 34,\n       \"createdBy\": 4,\n       \"updatedAt\": \"2017-08-25T07:16:14.252Z\",\n       \"createdAt\": \"2017-08-25T07:16:14.252Z\"\n   },\n   \"userChats\": [\n       {\n           \"userId\": 2,\n           \"chatId\": 34\n       },\n       {\n           \"userId\": 1,\n           \"chatId\": 34\n       },\n       {\n           \"userId\": 4,\n           \"chatId\": 34\n       }\n   ],\n   \"User\": {\n       \"id\": 4,\n       \"sid\": \"c75ac4dd-df5c-4371-af3d-1c5b4e8c81d3\",\n       \"email\": \"shaw.ung@pathmazing.com\",\n       \"firstName\": \"Shaw\",\n       \"lastName\": \"Ung\",\n       \"imageUrl\":          \"https://res.cloudinary.com/dqgbojnjw/image/upload/t_media_lib_thumb/v1503633067/photo_2017-08-17_10-30-49_hztgab.jpg\",\n       \"createdAt\": \"2017-08-24T09:32:46.000Z\",\n       \"updatedAt\": \"2017-08-25T04:11:47.000Z\",\n       \"deletedAt\": null,\n       \"screenName\": \"Shaw Ung\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/doc/chat.doc.js",
    "groupTitle": "Chat"
  },
  {
    "type": "POST",
    "url": "/v1/chats/:id/invites",
    "title": "Kick User From Chat",
    "name": "KickUserToChat",
    "group": "Chat",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access-Token</p>"
          }
        ]
      }
    },
    "description": "<p>This End Point will kcik user from chat and return chat with user list in the chat.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ArrayInt",
            "optional": false,
            "field": "userChatIds",
            "description": "<p>Array of the user that you want to kick from chat.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Respone:",
          "content": "HTTP 200 Ok\n  {\n   \"chat\": {\n       \"title\": \"Default Chat\",\n       \"id\": 34,\n       \"createdBy\": 4,\n       \"updatedAt\": \"2017-08-25T07:16:14.252Z\",\n       \"createdAt\": \"2017-08-25T07:16:14.252Z\"\n   },\n   \"userChats\": [\n       {\n           \"userId\": 2,\n           \"chatId\": 34\n       },\n       {\n           \"userId\": 1,\n           \"chatId\": 34\n       },\n       {\n           \"userId\": 4,\n           \"chatId\": 34\n       }\n   ],\n   \"User\": {\n       \"id\": 4,\n       \"sid\": \"c75ac4dd-df5c-4371-af3d-1c5b4e8c81d3\",\n       \"email\": \"shaw.ung@pathmazing.com\",\n       \"firstName\": \"Shaw\",\n       \"lastName\": \"Ung\",\n       \"imageUrl\":          \"https://res.cloudinary.com/dqgbojnjw/image/upload/t_media_lib_thumb/v1503633067/photo_2017-08-17_10-30-49_hztgab.jpg\",\n       \"createdAt\": \"2017-08-24T09:32:46.000Z\",\n       \"updatedAt\": \"2017-08-25T04:11:47.000Z\",\n       \"deletedAt\": null,\n       \"screenName\": \"Shaw Ung\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/doc/chat.doc.js",
    "groupTitle": "Chat"
  },
  {
    "type": "GET",
    "url": "/v1/profiles",
    "title": "Get User Profile",
    "name": "GetUserProfile",
    "group": "Profiles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access-Token</p>"
          }
        ]
      }
    },
    "description": "<p>This End Point will return a user profiles.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Respone:",
          "content": "HTTP 200 Ok\n{\n    \"id\": 4,\n     \"sid\": \"c75ac4dd-df5c-4371-af3d-1c5b4e8c81d3\",\n     \"email\": \"shaw.ung@pathmazing.com\",\n     \"firstName\": \"Shaw\",\n     \"lastName\": \"Ung\",\n     \"imageUrl\": \"https://res.cloudinary.com/dqgbojnjw/image/upload/t_media_lib_thumb/v1503633067/photo_2017-08-17_10-30-49_hztgab.jpg\",\n     \"createdAt\": \"2017-08-24T09:32:46.000Z\",\n     \"updatedAt\": \"2017-08-24T09:32:46.000Z\",\n     \"deletedAt\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/doc/user.doc.js",
    "groupTitle": "Profiles"
  },
  {
    "type": "PUT",
    "url": "/v1/profiles",
    "title": "Update User Profile",
    "name": "UpdateUserProfile",
    "group": "Profiles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Access-Token</p>"
          }
        ]
      }
    },
    "description": "<p>This End Point will update user profile and return a new user profiles.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sid",
            "description": "<p>Sid of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imageUrl",
            "description": "<p>Image path of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "createAt",
            "description": "<p>Creat Time Stamp of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "updateAt",
            "description": "<p>Update Time Stamp of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Datetime",
            "optional": false,
            "field": "deleteAt",
            "description": "<p>Delete Time Stamp of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Respone:",
          "content": "HTTP 200 Ok\n{\n    \"id\": 4,\n     \"sid\": \"c75ac4dd-df5c-4371-af3d-1c5b4e8c81d3\",\n     \"email\": \"shaw.ung@pathmazing.com\",\n     \"firstName\": \"Shaw\",\n     \"lastName\": \"Ung\",\n     \"imageUrl\": \"https://res.cloudinary.com/dqgbojnjw/image/upload/t_media_lib_thumb/v1503633067/photo_2017-08-17_10-30-49_hztgab.jpg\",\n     \"createdAt\": \"2017-08-24T09:32:46.000Z\",\n     \"updatedAt\": \"2017-08-24T09:32:46.000Z\",\n     \"deletedAt\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/doc/user.doc.js",
    "groupTitle": "Profiles"
  }
] });
