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
  }
}
export default Websocket
