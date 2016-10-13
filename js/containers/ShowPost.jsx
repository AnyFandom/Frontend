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
    last_comment: 0,
    comments_new: [],
  }

  async fetchPost() {
    let post = await Api.loadPost(this.props.params.id)
    this.setState({post: post})
  }

  async fetchComments() {
    let comments = await Api.loadPostComments(this.props.params.id)
    this.setState({comments: comments})
    window.comments = comments
  }

  async fetchLastComment() {
    let last_comment = await Api.loadPostLastComment(this.props.params.id)
    this.setState({last_comment: last_comment})
  }

  calcCommentsNew() {
    let c_ids = this.state.comments.map((i)=>{return i.id})
    let new_ids = c_ids.slice(c_ids.indexOf(this.state.last_comment)+1)
    console.log(c_ids, new_ids)
    this.setState({comments_new: new_ids})
  }

  async componentDidMount() {
    Emitter.push('current-page-update', 'posts')

    this.fetchPost()
    await this.fetchComments()
    await this.fetchLastComment()
    this.calcCommentsNew()

    Emitter.listen('comments-update.post-'+this.props.params.id, this.fetchComments.bind(this))
    Emitter.listen('post-update.post-'+this.props.params.id, this.fetchPost.bind(this))

    Emitter.listen('current-comment-set', function(id){
      Api.setPostLastComment(this.props.params.id, id)
      this.setState({last_comment: id})
      this.calcCommentsNew()
      console.log(this.state.last_comment)
    }.bind(this))
  }

  render() {
    window.goToNextComment = function() {
      scrollToComment(this.state.comments_new[0])
    }.bind(this)
    return (<div>
      <Post post={this.state.post} />
      <CommentTree comments={this.state.comments} postId={this.state.post.id} new={this.state.comments_new} />
    </div>);
  }
}
