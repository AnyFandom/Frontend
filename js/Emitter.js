var EventEmitter2 = require('eventemitter2').EventEmitter2;

class Emitter extends EventEmitter2 {
  listen = this.on
  removeListener = this.removeListener
  push = this.emit
}

export default new Emitter({
  wildcard: true,
  delimiter: '.',
  newListener: false,
  maxListeners: 20
});
