import React, {PropTypes} from 'react';
import dateformat from 'dateformat';
import CircleIcon from './CircleIcon';
import AddCommentForm from './AddCommentForm';
import EditCommentForm from './EditCommentForm';
import Api from '../Api';
import Core from '../Core';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    answerIsOpen: false,
    editIsOpen: false,
  }

  answerOnClick(e) {
    e.preventDefault()
    this.setState({answerIsOpen: this.state.answerIsOpen? false:true})
  }

  editOnClick(e) {
    e.preventDefault()
    this.setState({editIsOpen: this.state.editIsOpen? false:true})
  }

  async onDeleteClick(e) {
    e.preventDefault()
    if (confirm('Вы уверены, что хотите удалить этот комментарий?')) {
      await Api.deleteComment(this.props.comment.id)
      Core.push('comments-update.post-'+this.props.comment.post.id)
    }
  }

  render() {
    let comment = this.props.comment
    return (<div className='comment-wrapper' style={{'paddingLeft': ('64'*comment.depth)+'px'}}><div className='comment'>
      <img className='author-avatar' src={comment.owner.avatar} />
      <div className='comment-content'>
        <ul className='comment-info'>
          <li className='comment-author'><a>{comment.owner.username}</a></li>
          <li>/</li>
          <li><span className='comment-date'>{dateformat(comment.date, 'dddd, mm.d.yy, H:MM')}</span></li>
          <li>/</li>
          <li><a href='#' className='сomment-edit' onClick={this.editOnClick.bind(this)}>edit</a></li>
          <li>/</li>
          <li><a href='#' onClick={this.onDeleteClick.bind(this)} className='сomment-delete'>delete</a></li>
        </ul>
        <span className='comment-text'>{comment.content}</span>
        <ul className='comment-actions'>
          <li>
            <span className='comment-reply' onClick={this.answerOnClick.bind(this)}>
              <CircleIcon>reply</CircleIcon>
              <span className='comment-reply-label'></span>
            </span>
          </li>
        </ul>
      </div>
      {this.state.answerIsOpen? <AddCommentForm postId={comment.post.id} parentId={comment.id} handleAdd={this.answerOnClick.bind(this)} /> : ''}
      {this.state.editIsOpen? <EditCommentForm comment={comment} handleSubmit={this.editOnClick.bind(this)} /> : ''}
    </div></div>);
  }
}

Comment.propTypes = {
};
