import React, {PropTypes} from 'react';
import dateformat from 'dateformat';
import CircleIcon from './CircleIcon';
import AddCommentForm from './AddCommentForm';
import EditCommentForm from './EditCommentForm';
import Api from '../Api';
import Emitter from '../Emitter';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    answerIsOpen: false,
    editIsOpen: false,
    current: false,
  }

  answerOnClick(e) {
    //e.preventDefault()
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
      Emitter.push('comments-update.post-'+this.props.comment.post.id)
    }
  }

  componentDidMount() {
    let comment = this.props.comment
    Emitter.listen('current-comment-set', function(id){
      if (id == comment.id) {
        this.setState({current: true})
      } else {
        this.setState({current: false})
      }
    }.bind(this))
  }

  render() {
    let padding_size = 32
    let comment = this.props.comment
    let max_padding = padding_size*Math.floor((this.props.containerWidth-400)/padding_size)
    let padding = (padding_size*comment.depth)<max_padding? (padding_size*comment.depth) : max_padding
    return (<div className='comment-wrapper' style={{'paddingLeft': padding+'px'}}><div className={'comment'+(this.state.current? ' current':'')+(this.props.new? ' new':'')} id={'comment-'+comment.id}>
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
