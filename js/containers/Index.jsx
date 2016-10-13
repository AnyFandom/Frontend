import React, {PropTypes} from 'react';
import Post from '../components/Post'
import Api from '../Api'
import Emitter from '../Emitter';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  async fetchPosts() {
    let posts = await Api.loadPosts()
    this.setState({posts: posts})
  }

  state = {posts: []}

  componentDidMount() {
    Emitter.push('current-page-update', 'posts')

    this.fetchPosts()

    Emitter.listen('post-list-update', this.fetchPosts.bind(this))
  }

  render() {
    return (<div>{this.state.posts.map(function(item){
      return <Post post={item} key={item.id} short />
    })}</div>);
  }
}

Index.propTypes = {
};
