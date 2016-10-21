import React, {PropTypes} from 'react';
import Post from '../components/Post'
import Api from '../Api'
import CommentTree from '../components/CommentTree'
import NewCommentsCounter from '../components/NewCommentsCounter'

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
    this.calcCommentsNew()
  }

  async fetchLastComment() {
    let last_comment = await Api.loadPostLastComment(this.props.params.id)
    this.setState({last_comment: last_comment})
  }

  async calcCommentsNew() {
    let newComments = await Api.loadCommentsNew(this.props.params.id)
    console.log('Comments New: ',newComments);
    this.setState({comments_new: newComments.map((item)=>{return item.id})})
  }


  async clearAllNew() {
    console.log(this.state.comments_new[this.state.comments_new.length-1])
    await Api.setPostLastComment(this.props.params.id, this.state.comments_new[this.state.comments_new.length-1])
    await this.fetchLastComment()
    this.calcCommentsNew()
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
    }.bind(this))
  }

  componentDidUpdate() {
    //this.calcCommentsNew()
  }

  render() {
    window.goToNextComment = function() {
      scrollToComment(this.state.comments_new[0])
    }.bind(this)
    return (<div>
      <Post post={this.state.post} />
      <CommentTree comments={this.state.comments} postId={this.state.post.id} new={this.state.comments_new} />
      <NewCommentsCounter comments={this.state.comments_new} clear={this.clearAllNew.bind(this)} />
    </div>);
  }
}
