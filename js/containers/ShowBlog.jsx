import React, {PropTypes} from 'react';
import Api from '../Api'
import PostList from '../components/PostList'

export default class ShowBlog extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    blog: {},
    posts: [],
  }

  async componentDidMount() {
    let blog = await Api.loadBlog(this.props.params.id)
    this.setState({blog:blog})

    let posts = await Api.loadBlogPosts(this.props.params.id)
    this.setState({posts: posts})
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
        </section>
      </div>
      <PostList posts={this.state.posts} />
      </div>);
  }
}

ShowBlog.propTypes = {
};
