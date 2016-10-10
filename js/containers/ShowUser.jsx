import React, {PropTypes} from 'react';
import Api from '../Api';
import Core from '../Core'
import Post from '../components/Post';

export default class ShowUser extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    user: {},
    posts: [],
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
    Core.push('current-page-update', 'users')

    await this.fetchUser()
    this.fetchUserPosts()

    Core.listen('user-update.user-'+this.state.user.id, this.fetchUser.bind(this))
  }

  render() {
    return (<div>
      <div className='user-profile'>
        <img className='avatar' src={this.state.user.avatar} />
        <section className='info'>
          <span className='username'>{this.state.user.username}</span>
          <span className='description'>
            {this.state.user.description}
          </span>
        </section>
      </div>
      {this.state.posts.map(function(item){
        return <Post post={item} key={item.id} short />
      })}</div>);
  }
}

ShowUser.propTypes = {
};
