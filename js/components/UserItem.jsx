import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default class UserItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let user = this.props.user
    return (<div className='user-item'>
      <img src={user.avatar} />
      <span><Link to={`/app/users/${user.username}`}>{user.username}</Link></span>
    </div>);
  }
}

UserItem.propTypes = {
};
