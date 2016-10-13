import React, {PropTypes} from 'react';
import Post from '../components/Post'
import Api from '../Api'
import CommentTree from '../components/CommentTree'

import Emitter from '../Emitter';

export default class ShowPost extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    post: {},
    comments: [],
  }

  async fetchPost() {
    let post = await Api.loadPost(this.props.params.id)
    this.setState({post: post})
  }

  async fetchComments() {
    let comments = await Api.loadPostComments(this.props.params.id)
    this.setState({comments: comments})
  }

  async componentDidMount() {
    Emitter.push('current-page-update', 'posts')

    this.fetchPost()
    this.fetchComments()

    Emitter.listen('comments-update.post-'+this.props.params.id, this.fetchComments.bind(this))
    Emitter.listen('post-update.post-'+this.props.params.id, this.fetchPost.bind(this))
  }

  render() {
    return (<div>
      <Post post={this.state.post} />
      <CommentTree comments={this.state.comments} postId={this.state.post.id} />
    </div>);
  }
}
