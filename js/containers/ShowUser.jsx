import React, {PropTypes} from 'react';
import Api from '../Api';
import Emitter from '../Emitter'
import Post from '../components/Post';
import CircleIcon from '../components/CircleIcon'
import {NotificationManager} from 'react-notifications';
import {Link} from 'react-router'

export default class ShowUser extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    user: {},
    posts: [],
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  async fetchUser() {
    let user = await Api.loadUser(this.props.params.username)
    this.setState({user: user})
  }

  async fetchUserPosts() {
    let user_posts = await Api.loadUserPosts(this.props.params.username)
    this.setState({posts: user_posts})
  }

  async componentDidMount() {
    Emitter.push('current-page-update', 'users')

    await this.fetchUser()
    this.fetchUserPosts()

    Emitter.listen('user-update.user-'+this.state.user.id, this.fetchUser.bind(this))
  }

  async onDeleteClick() {
    if (confirm('Вы уверены, что хотите удалить пользователя?')) {
      await Api.deleteUser(this.state.user.id)
      this.context.router.push(`/app/users/`);
      NotificationManager.success('Пользователь удален', 'Успешно')
    }
  }

  render() {
    return (<div>
      <div className='user-profile'>
        <img className='avatar' src={this.state.user.avatar} />
        <section className='info'>
          <span className='username'>{this.state.user.username}</span>
          <span className='description'
            dangerouslySetInnerHTML={
              {__html: (this.state.user.description||'').replace(
                new RegExp('\r?\n','g'), '<br />'
              )}} />
          <div className='actions'>
            <CircleIcon onClick={this.onDeleteClick.bind(this)}>delete</CircleIcon>
            <Link to={`/app/users/${this.state.user.username}/edit`}><CircleIcon>edit</CircleIcon></Link>
          </div>
        </section>
      </div>
      {this.state.posts.map(function(item){
        return <Post post={item} key={item.id} short />
      })}</div>);
  }
}

ShowUser.propTypes = {
};
