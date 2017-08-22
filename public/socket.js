SevakamApp.service('Socket', [
  '$rootScope',
  '$timeout',
  '$http',
  function ($rootScope, $timeout, $http) {
    var socket = io('http://localhost:8080', {
      query: { auth: $rootScope.tokenUser },
      transports: ['websocket']
    })
    socket.on('connect', function () {
      console.log('connected')
    })
    socket.on('disconnect', function () {
      console.log('disconnected')
    })
    socket.on('error', function (data) {
      console.log(data || 'error')
    })
    socket.on('connect_failed', function (data) {
      console.log(data || 'connect_failed')
    })
    
    socket.groupChat = function (data) {
      $timeout(function () {
        $rootScope.listGroupMessage.push(data)
        window.setTimeout(function () {
          var elem = document.getElementById('box-message-group')
          elem.scrollTop = elem.scrollHeight
        })
      }, 100)
    }
    socket.gotChat = function (data) {
      $timeout(function () {
        $rootScope.listMessage.push(data)
        window.setTimeout(function () {
          var elem = document.getElementById('box-message')
          elem.scrollTop = elem.scrollHeight
        })
      }, 100)
    }
    socket.friendRequest = function (data) {
    }
    socket.online = function (data) {
      $timeout(function () {
        for (let i in $rootScope.friendsList) {
          for(let j in data){
            if ($rootScope.friendsList[i]._id === data[j].id){
                if (data[j].online === true){
                  $rootScope.friendsList[i].online_status = 'online'
                }else{
                  $rootScope.friendsList[i].online_status = 'offline'
                }
            }
          }
        }
      }, 100)
    }

    socket.typing = function (data) {
      $timeout(function () {
        $('.typing').show()
      })
    }
    // socket.on('message', function (data) {
    //   console.log('message====', data)
    //   if (!data) return
    //   switch (data.action) {
    //     case 'chat':
    //       return socket.gotChat(data)
    //     case 'friend-request':
    //       return socket.friendRequest(data)
    //     case 'group-chat':
    //       return socket.groupChat(data)
    //     case 'online':
    //       return socket.online(data)
    //     case 'offline':
    //       return socket.offline(data)
    //     case 'typing':
    //       return socket.typing(data)
    //     case 'stop-typing':
    //       return socket.stopTyping(data)
    //   }
    // })

    socket.on('CHAT', data => socket.gotChat(data))
    socket.on('CHECK_MY_ONLINE_FRIENDS', data => socket.online(data))
    socket.on('CHAT_GROUP', data => socket.groupChat(data))
    setInterval(function () {
      socket.emit('CHECK_MY_ONLINE_FRIENDS')
    }, 1000)
    return socket
  }
])
