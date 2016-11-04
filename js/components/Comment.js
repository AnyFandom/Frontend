import React, {PropTypes} from 'react';
import dateformat from 'dateformat';
import CircleIcon from './CircleIcon';
import AddCommentForm from './AddCommentForm';
import EditCommentForm from './EditCommentForm';
import Api from '../Api';
import Emitter from '../Emitter';
import Storage from '../Storage'

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    answerIsOpen: false,
    editIsOpen: false,
    current: false,
    user: {},
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
    console.log(comment);
    Emitter.listen('current-comment-set', function(id){
      if (id == comment.id) {
        this.setState({current: true})
      } else {
        this.setState({current: false})
      }
    }.bind(this))
    this.setState({user: Storage.get('user_'+comment.user_id)})
  }

  render() {
    let padding_size = 32
    let comment = this.props.comment
    let max_padding = padding_size*Math.floor((this.props.containerWidth-400)/padding_size)
    let padding = (padding_size*comment.depth)<max_padding? (padding_size*comment.depth) : max_padding

    let user = this.state.user

    return (<div className='comment-wrapper' style={{'paddingLeft': padding+'px'}}><div className={'comment'+(this.state.current? ' current':'')+(this.props.new? ' new':'')} id={'comment-'+comment.id}>
      <img className='author-avatar' src={user.avatar || 'https://static.lunavod.ru/img/users/1/avatar_100x100.jpg'} />
      <div className='comment-content'>
        <ul className='comment-info'>
          <li className='comment-author'><a>{user.username}</a></li>
          <li>/</li>
          <li><span className='comment-date'>{dateformat(comment.updated_at, 'dddd, mm.d.yy, H:MM')}</span></li>
          <li>/</li>
          <li><a href='#' className='сomment-edit' onClick={this.editOnClick.bind(this)}>edit</a></li>
          <li>/</li>
          <li><a href='#' onClick={this.onDeleteClick.bind(this)} className='сomment-delete'>delete</a></li>
        </ul>
        <span className='comment-text' dangerouslySetInnerHTML={{__html: comment.content.replace(new RegExp('\r?\n','g'), '<br />')}} />
        <ul className='comment-actions'>
          <li>
            <span className='comment-reply' onClick={this.answerOnClick.bind(this)}>
              <CircleIcon>reply</CircleIcon>
              <span className='comment-reply-label'></span>
            </span>
          </li>
        </ul>
      </div>
      {this.state.answerIsOpen? <AddCommentForm postId={comment.post_id} parentId={comment.id} handleAdd={this.answerOnClick.bind(this)} /> : ''}
      {this.state.editIsOpen? <EditCommentForm comment={comment} handleSubmit={this.editOnClick.bind(this)} /> : ''}
    </div></div>);
  }
}

Comment.propTypes = {
};
