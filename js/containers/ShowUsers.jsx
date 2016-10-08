import React, {PropTypes} from 'react';
import Api from '../Api'
import UserItem from '../components/UserItem'
import Core from '../Core'

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
    Core.push('current-page-update', 'users')
    this.fetchUsers()
    Core.listen('user-list-update', this.fetchUsers.bind(this))
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
