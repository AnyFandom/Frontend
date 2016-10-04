import React, {PropTypes} from 'react';
import Post from './Post'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Storage from '../Storage'

import {NotificationContainer} from 'react-notifications';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (<div id='root'>
      <Navbar />
      <div className='page'>
        <div className='content'>
          {this.props.children}
        </div>
        <Sidebar />
      </div>
      <NotificationContainer/>
    </div>);
  }
}

Layout.propTypes = {
};
