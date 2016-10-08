var io = require('socket.io-client');
import Storage from './Storage'
import Core from './Core'

class Websocket {
  constructor() {
    this.socket = io('http://localhost:5000')
    this.socket.on('my response', function(data){
      console.log(data)
    }.bind(this))

    this.socket.on('connect', function(){
      this.socket.emit('init', Storage.get('token'))
    }.bind(this))

    this.socket.on('notification', function(data){
      Core.push('new-notification', data.options)
    })

    this.socket.on('update_request', function(data){
      let event = ''
      switch(data.type) {
        case 'comments':
          event = `comments-update.post-${data.id}`
          break
        case 'post-list':
          event = `post-list-update`
          break
        case 'user-list':
          event = `user-list-update`
          break
        case 'fandom-list':
          event = `fandom-list-update`
          break
        case 'blog-list':
          event = `blog-list-update.fandom-${data.id}`
          break
      }
      Core.push(event)
    })
  }
}
export default Websocket
