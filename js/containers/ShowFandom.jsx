import React, {PropTypes} from 'react';
import Api from '../Api'
import PostList from '../components/PostList'
import BlogList from '../components/BlogList'
import CircleIcon from '../components/CircleIcon'
import { Tabs, Tab } from 'react-tab-view'
import {Link} from 'react-router'
import {NotificationManager} from 'react-notifications';
import Emitter from '../Emitter'

export default class ShowFandom extends React.Component {
  constructor(props) {
    super(props);
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  async fetchFandom() {
    let fandom = await Api.loadFandom(this.props.params.id)
    this.setState({fandom: fandom})
  }

  async fetchPosts() {
    let posts = await Api.loadFandomPosts(this.props.params.id)
    this.setState({posts: posts})
  }

  async fetchBlogs() {
    let blogs = await Api.loadBlogs(this.props.params.id)
    this.setState({blogs: blogs})
  }

  state = {
    fandom: {},
    posts: [],
    blogs: [],
  }

  async componentDidMount() {
    Emitter.push('current-page-update', 'fandoms')

    await this.fetchFandom()
    this.fetchPosts()
    this.fetchBlogs()

    Emitter.listen('fandom-update.fandom-'+this.state.fandom.id, this.fetchFandom.bind(this))
    Emitter.listen('post-list-update', this.fetchPosts.bind(this))
    Emitter.listen('blog-list-update.fandom-'+this.state.fandom.id, this.fetchBlogs.bind(this))
  }

  async onDeleteClick() {
    if (confirm('Вы уверены, что хотите удалить фэндом?')) {
      await Api.deleteFandom(this.state.fandom.id)
      this.context.router.push(`/app/fandoms/`);
      NotificationManager.success('Фэндом удален', 'Успешно')
    }
  }

  render() {
    return (<div>
      <div className='fandom'>
        <img className='avatar' src={this.state.fandom.avatar} />
        <section className='info'>
          <span className='title'>{this.state.fandom.title}</span>
          <span className='description'
            dangerouslySetInnerHTML={
              {__html: (this.state.fandom.description||'').replace(
                new RegExp('\r?\n','g'), '<br />'
              )}} />
          <div className='actions'>
            <CircleIcon onClick={this.onDeleteClick.bind(this)}>delete</CircleIcon>
            <Link to={`/app/fandoms/${this.state.fandom.id}/edit`}><CircleIcon>edit</CircleIcon></Link>
          </div>
        </section>
      </div>
      <Tabs headers={['Posts', 'Blogs']}>
        <Tab>
          <PostList posts={this.state.posts} />
        </Tab>
        <Tab>
          <BlogList blogs={this.state.blogs} />
        </Tab>
      </Tabs>
      </div>);
  }
}

ShowFandom.propTypes = {
};
