import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import Emitter from './Emitter';

import Notifications from './Notifications'
import Websocket from './Websockets'

import Routes from './components/Routes'

var Notify = new Notifications('')
Notify.init()

new Websocket()

ReactDOM.render(<Routes />, document.getElementById('app-root'));

window.getCoords = function(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}
