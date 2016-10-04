import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import Notifications from './Notifications'
import Websocket from './Websockets'

import Routes from './components/Routes'

var Notify = new Notifications('')
Notify.init()

new Websocket()

ReactDOM.render(<Routes />, document.getElementById('app-root'));
