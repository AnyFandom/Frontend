import React, {PropTypes} from 'react';
import Post from '../components/Post'
import Api from '../Api'
import CommentTree from '../components/CommentTree'

import Core from '../Core';

export default class ShowPost extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    post: {},
    comments: [],
  }

  async componentDidMount() {
    let post = await Api.loadPost(this.props.params.id)
    this.setState({post: post})

    let comments = await Api.loadPostComments(this.props.params.id)
    this.setState({comments: comments})

    Core.listen('comments-update.post-'+this.props.params.id, async function(){
      let comments = await Api.loadPostComments(this.props.params.id)
      this.setState({comments: comments})
    }.bind(this))
  }

  render() {
    return (<div>
      <Post post={this.state.post} />
      <CommentTree comments={this.state.comments} postId={this.state.post.id} />
    </div>);
  }
}
