import React, {PropTypes} from 'react';
import Api from '../Api'
import PostList from '../components/PostList'
import BlogList from '../components/BlogList'
import { Tabs, Tab } from 'react-tab-view'

export default class ShowFandom extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    fandom: {},
    posts: [],
    blogs: [],
  }

  async componentDidMount() {
    let fandom = await Api.loadFandom(this.props.params.id)
    this.setState({fandom: fandom})

    let posts = await Api.loadFandomPosts(this.props.params.id)
    this.setState({posts: posts})

    let blogs = await Api.loadBlogs(this.props.params.id)
    this.setState({blogs: blogs})
  }

  render() {
    return (<div>
      <div className='fandom'>
        <img className='avatar' src={this.state.fandom.avatar} />
        <section className='info'>
          <span className='title'>{this.state.fandom.title}</span>
          <span className='description'>
            {this.state.fandom.description}
          </span>
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
