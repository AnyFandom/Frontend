import React, {PropTypes} from 'react';
import Checkbox from '../components/Checkbox';
import Single from '../components/Single';
import Api from '../Api';

export default class EditPost extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    post: {},
    titleValue: '',
    contentValue: '',
    previewValue: '',
  }

  previewOnChange(e) {
    this.setState({previewValue: e.target.value})
  }

  titleOnChange(e) {
    this.setState({titleValue: e.target.value})
  }

  contentOnChange(e) {
    this.setState({contentValue: e.target.value})
  }

  async editPost(e) {
    e.preventDefault();
    console.log(this.state.content);
    await Api.editPost(this.state.post.id, this.state.titleValue, this.state.contentValue, this.state.previewValue)
    document.location = `/app/posts/${this.state.post.id}`
  }

  async componentDidMount() {
    let post = await Api.loadPost(this.props.params.id)
    this.setState(
      {
        post: post,
        titleValue: post.title,
        contentValue: post.content,
        previewValue: post.preview_image,
      }
    )
  }

  handleCheckClick(e) {
    console.log('Check!');
  }

  render() {
    return (<Single title='Edit Post'
              preview = 'https://www.colourbox.com/preview/9364894-vector-seamless-pattern-childish-doodles-pattern-set-of-different-school-travel-romantic-things-enjoy-life-concept-use-for-wallpaper-pattern-fills-web-page-background-surface-textures.jpg'
            >
      <form>
        <fieldset>
          <label htmlFor='post-title'>Post preview image URL:</label>
          <input onChange={this.previewOnChange.bind(this)} value={this.state.previewValue} name='post-title' type='url' placeholder='Preview image URL' />
        </fieldset>
        <fieldset>
          <label htmlFor='post-title'>Post title:</label>
          <input onChange={this.titleOnChange.bind(this)} value={this.state.titleValue} name='post-title' type='text' placeholder='Title' />
        </fieldset>
        <fieldset>
          <label htmlFor='post-content'>Post content:</label>
          <textarea onChange={this.contentOnChange.bind(this)} value={this.state.contentValue} placeholder='Content' name='post-content' />
        </fieldset>
      <Checkbox handleClick={this.handleCheckClick} title='Test field' checked={true} label='check!' />
        <button onClick={this.editPost.bind(this)} type='submit'
        className='btn btn--color-positive submit-button'>Send</button>
      </form>
    </Single>);
  }
}

EditPost.propTypes = {
};
