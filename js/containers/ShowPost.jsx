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

  async fetchCommentsNew() {
    let newComments = await Api.loadCommentsNew(this.props.params.id)
    this.setState({comments_new: newComments.map((item)=>{return item.id})})
  }

  async sortCommentsNew() {
    let newComments = this.state.comments_new
    let comments = this.state.comments.map((item)=>{return item.id})
    newComments.sort(function(i1, i2){
      return comments.indexOf(i1)-comments.indexOf(i2)
    }.bind(this))
    this.setState({comments_new: newComments})
  }

  async calcCommentsNew() {
    await this.fetchCommentsNew()
    await this.sortCommentsNew()
  }


  async clearAllNew() {
    await Api.setPostCommentsReadAll(this.props.params.id)
    this.setState({comments_new: []})
  }

  async componentDidMount() {
    Emitter.push('current-page-update', 'posts')

    this.fetchPost()
    await this.fetchComments()
    await this.fetchCommentsNew()
    await this.sortCommentsNew()
    Emitter.on('comment.add',
      function(comment){
          if (comment.post.id == this.props.params.id) {
            this.injectComment(comment)
          }
      }.bind(this)
    )
    Emitter.listen('post-update.post-'+this.props.params.id, this.fetchPost.bind(this))

    Emitter.listen('current-comment-set', function(id){
      this.calcCommentsNew()
    }.bind(this))
  }

  async injectComment(new_comment) {
    let comments = this.state.comments
    let comments_ids = comments.map((item)=>{return item.id})

    let comments_new = this.state.comments_new

    if (!new_comment.parent) {
      comments_new.push(new_comment.id)
      comments.push(new_comment)
      this.setState({comments: comments, comments_new: comments_new})
      this.sortCommentsNew()
      return
    }

    let parent_index = comments_ids.indexOf(new_comment.parent.id)
    let parent = comments[parent_index]

    let comments_search = comments.slice(parent_index+1)
    comments_search.reverse()

    let insert_before = null
    let insert_after = null

    for (let i in comments_search) {
      let curr = comments_search[i]
      if (curr.depth <= parent.depth && curr != parent) {
        insert_before = comments.indexOf(curr)
      }
    }

    if (insert_before) {
      comments.splice(insert_before, 0, new_comment)
    } else {
      comments.push(new_comment)
    }

    comments_new.push(new_comment.id)
    this.setState({comments: comments, comments_new: comments_new})
    this.sortCommentsNew()
  }

  render() {
    return (<div>
      <Post post={this.state.post} />
      <CommentTree comments={this.state.comments} postId={this.state.post.id} new={this.state.comments_new} />
      <NewCommentsCounter comments={this.state.comments_new} clear={this.clearAllNew.bind(this)} />
    </div>);
  }
}
