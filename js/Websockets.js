var io = require('socket.io-client');
import Storage from './Storage'
import Emitter from './Emitter'
import Api from './Api'

class Websocket {
  constructor() {
    this.socket = io(Api.http_host)
    this.socket.on('my response', function(data){
      console.log(data)
    }.bind(this))

    this.socket.on('connect', function(){
      this.socket.emit('init', Storage.get('token'))
    }.bind(this))

    this.socket.on('notification', function(data){
      Emitter.push('new-notification', data.options)
    })

    this.socket.on('update_request', function(data){
      let event = ''
      switch(data.type) {
        case 'comment-list':
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

        case 'comment':
          event = `comment-update.comment-${data.id}`
          break
        case 'blog':
          event = `blog-update.blog-${data.id}`
          break
        case 'fandom':
          event = `fandom-update.fandom-${data.id}`
          break
        case 'post':
          event = `post-update.post-${data.id}`
          break
        case 'user':
          event = `user-update.user-${data.id}`
          break
      }
      console.log('Update', event, data)
      Emitter.push(event)
    })
    this.socket.on('update', function(data){
      console.log(data)
      Emitter.emit(data['event'], data['payload'])
    })
  }
}
export default Websocket
