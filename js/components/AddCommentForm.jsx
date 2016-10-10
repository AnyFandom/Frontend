import React, {PropTypes} from 'react';
import Api from '../Api';
import Core from '../Core';

export default class AddCommentForm extends React.Component {
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
    let data = await Api.addComment(
      this.props.postId,
      this.props.parentId,
      this.state.contentValue
    )
    if (this.props.handleAdd) this.props.handleAdd(e)
  }

  render() {
    return (<div className='add-comment-form'>
      <form>
        <textarea onChange={this.contentOnChange.bind(this)} name='comment-content' />
        <button type='submit' className='btn btn-submit' onClick={this.handleSubmit.bind(this)}>Post</button>
      </form>
    </div>);
  }
}

AddCommentForm.propTypes = {
};
