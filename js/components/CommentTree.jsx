import React, {PropTypes} from 'react';
import Comment from './Comment';
import AddCommentForm from './AddCommentForm';

export default class CommentTree extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    addFormIsOpen: false,
    width: 0,
  }

  addCommentOnClick(e) {
    e.preventDefault()
    this.setState({addFormIsOpen: this.state.addFormIsOpen? false:true})
  }

  componentDidMount() {
    this.setState({width: this.refs.comment_tree.offsetWidth})
  }

  render() {
    return (<div className='comment-tree' ref='comment_tree'>
    <h3><span className='title-deco' /> Comments ({this.props.comments.length}):</h3>
      <section>
        {this.props.comments.map((item)=> {
          return <Comment key={'comment_'+item.id} comment={item} containerWidth={this.state.width} />
        })}
        <a href='#' className='comment-add-title' onClick={this.addCommentOnClick.bind(this)}>Add comment</a>
        {this.state.addFormIsOpen? <AddCommentForm postId={this.props.postId} parentId={0} handleAdd={this.addCommentOnClick.bind(this)} />:''}
      </section>
    </div>);
  }
}

CommentTree.propTypes = {
};
