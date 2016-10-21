import React, {PropTypes} from 'react';
import Emitter from '../Emitter'
import Api from '../Api'
var scroller = require('scroll-to-js')

export default class NewCommentsCounter extends React.Component {

  async scrollToComment(id) {
    if (!id) return
    let comment = document.querySelector('#comment-'+id)
    Api.setCommentRead(id)
    await scroller(document.body, comment.offsetTop-200, 200)
    Emitter.push('current-comment-set', id)
  }


  goToNextComment() {
    this.scrollToComment(this.props.comments[0])
  }

  onCounterClick(e) {
      e.preventDefault();
      this.goToNextComment();
  }
  render() {
    return (<div className='comment-counter'>
      <div className='comment-count' onClick={this.onCounterClick.bind(this)}>
        {this.props.comments.length}
      </div>
      <div className='comment-counter-clear' onClick={this.props.clear}>
        <i className="material-icons">clear_all</i>
      </div>
    </div>);
  }
}

NewCommentsCounter.propTypes = {
};
