import React, {PropTypes} from 'react';
import Api from '../Api'
import Core from '../Core'

export default class EditCommentForm extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    contentValue: '',
  }

  contentOnChange(e) {
    this.setState({contentValue: e.target.value})
  }

  async handleSubmit(e) {
    e.preventDefault();
    let data = await Api.editComment(
      this.props.comment.id,
      this.state.contentValue
    )
    Core.push('comments-update.post-'+this.props.comment.post.id)
    if (this.props.handleSubmit) this.props.handleSubmit(e)
  }

  render() {
    return (<div className='edit-comment-form'>
      <form>
        <textarea onChange={this.contentOnChange.bind(this)} name='comment-content'>{this.props.comment.content}</textarea>
        <button type='submit' className='btn btn-submit' onClick={this.handleSubmit.bind(this)}>Edit</button>
      </form>
    </div>);
  }
}

EditCommentForm.propTypes = {
};
