import React, {PropTypes} from 'react';
import Api from '../Api'
import PostList from '../components/PostList'
import CircleIcon from '../components/CircleIcon'
import {Link} from 'react-router'
import {NotificationManager} from 'react-notifications';
import Core from '../Core'

export default class ShowBlog extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    blog: {},
    posts: [],
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  async fetchBlog() {
    let blog = await Api.loadBlog(this.props.params.id)
    this.setState({blog:blog})
  }

  async fetchBlogPosts() {
    let posts = await Api.loadBlogPosts(this.props.params.id)
    this.setState({posts: posts})
  }

  async componentDidMount() {
    Core.push('current-page-update', 'fandoms')

    await this.fetchBlog()
    this.fetchBlogPosts()

    Core.listen('blog-update.blog-'+this.state.blog.id, this.fetchBlog.bind(this))
  }

  async onDeleteClick() {
    if (confirm('Вы уверены, что хотите удалить блог?')) {
      await Api.deleteBlog(this.state.blog.id)
      this.context.router.push(`/app/fandoms/${this.state.blog.fandom.id}`);
      NotificationManager.success('Блог удален', 'Успешно')
    }
  }

  render() {
    return (<div>
      <div className='blog'>
        <img className='avatar' src={this.state.blog.avatar} />
        <section className='info'>
          <span className='title'>{this.state.blog.title}</span>
          <span className='description'>
            {this.state.blog.description}
          </span>
          <div className='actions'>
            <CircleIcon onClick={this.onDeleteClick.bind(this)}>delete</CircleIcon>
            <Link to={`/app/blogs/${this.state.blog.id}/edit`}><CircleIcon>edit</CircleIcon></Link>
          </div>
        </section>
      </div>
      <PostList posts={this.state.posts} />
      </div>);
  }
}

ShowBlog.propTypes = {
};
