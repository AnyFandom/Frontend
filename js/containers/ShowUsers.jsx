import React, {PropTypes} from 'react';
import Api from '../Api'
import UserItem from '../components/UserItem'
import Emitter from '../Emitter'

export default class ShowUsers extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    users: []
  }

  async fetchUsers() {
    let users = await Api.loadUsers()
    this.setState({users: users})
  }

  async componentDidMount() {
    Emitter.push('current-page-update', 'users')
    this.fetchUsers()
    Emitter.listen('user-list-update', this.fetchUsers.bind(this))
  }

  render() {
    return (<div className='users-container'>
        {this.state.users.map(function(item){
          return <UserItem user={item} key={`user_${item.id}`} />
        })}
      </div>);
  }
}

ShowUsers.propTypes = {
};
