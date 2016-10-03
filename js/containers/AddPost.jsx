import React, {PropTypes} from 'react';
import Checkbox from '../components/Checkbox';
import Single from '../components/Single';
import Api from '../Api';

export default class AddPost extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
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

  async addPost(e) {
    e.preventDefault();
    console.log(this.state.content);
    let new_location = await Api.addPost(this.state.titleValue, this.state.contentValue, this.state.previewValue)
    document.location = `/app${new_location}`
  }

  handleCheckClick(e) {
    console.log('Check!');
  }

  render() {
    return (<Single title='Add Post'
              preview = 'https://www.colourbox.com/preview/9364894-vector-seamless-pattern-childish-doodles-pattern-set-of-different-school-travel-romantic-things-enjoy-life-concept-use-for-wallpaper-pattern-fills-web-page-background-surface-textures.jpg'
            >
      <form>
        <fieldset>
          <label htmlFor='post-title'>Post preview image URL:</label>
          <input onChange={this.previewOnChange.bind(this)} name='post-title' type='url' placeholder='Preview image URL' />
        </fieldset>
        <fieldset>
          <label htmlFor='post-title'>Post title:</label>
          <input onChange={this.titleOnChange.bind(this)} name='post-title' type='text' placeholder='Title' />
        </fieldset>
        <fieldset>
          <label htmlFor='post-content'>Post content:</label>
          <textarea onChange={this.contentOnChange.bind(this)} placeholder='Content' name='post-content' />
        </fieldset>
      <Checkbox handleClick={this.handleCheckClick} title='Test field' checked={true} label='check!' />
        <button onClick={this.addPost.bind(this)} type='submit'
        className='btn btn--color-positive submit-button'>Send</button>
      </form>
    </Single>);
  }
}

AddPost.propTypes = {
};
