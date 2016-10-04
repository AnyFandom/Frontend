import React, {PropTypes} from 'react';
import Checkbox from '../components/Checkbox';
import Single from '../components/Single';
import Api from '../Api';
import {NotificationManager} from 'react-notifications';
import Core from '../Core'

export default class EditBlog extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    blog: {},
    titleValue: '',
    descrValue: '',
    avatarValue: '',
  }

  avatarOnChange(e) {
    this.setState({avatarValue: e.target.value})
  }

  titleOnChange(e) {
    this.setState({titleValue: e.target.value})
  }

  descriptionOnChange(e) {
    this.setState({descriptionValue: e.target.value})
  }

  async editBlog(e) {
    e.preventDefault();
    console.log(this.state.description);
    await Api.editBlog(this.state.blog.id, this.state.titleValue, this.state.descriptionValue, this.state.avatarValue)
    this.context.router.push(`/app/blogs/${this.state.blog.id}`);
    NotificationManager.success('Пост отредактирован', 'Успешно')
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  async componentDidMount() {
    Core.push('current-page-update', 'fandoms')
    let blog = await Api.loadBlog(this.props.params.id)
    this.setState(
      {
        blog: blog,
        titleValue: blog.title,
        descriptionValue: blog.description,
        avatarValue: blog.avatar,
      }
    )
  }

  render() {
    return (<Single title='Edit Blog'
              avatar = 'https://www.colourbox.com/avatar/9364894-vector-seamless-pattern-childish-doodles-pattern-set-of-different-school-travel-romantic-things-enjoy-life-concept-use-for-wallpaper-pattern-fills-web-page-background-surface-textures.jpg'
            >
      <form>
        <fieldset>
          <label htmlFor='blog-title'>Blog avatar URL:</label>
          <input onChange={this.avatarOnChange.bind(this)} value={this.state.avatarValue} name='blog-title' type='url' placeholder='Avatar URL' />
        </fieldset>
        <fieldset>
          <label htmlFor='blog-title'>Blog title:</label>
          <input onChange={this.titleOnChange.bind(this)} value={this.state.titleValue} name='blog-title' type='text' placeholder='Title' />
        </fieldset>
        <fieldset>
          <label htmlFor='blog-description'>Blog description:</label>
          <textarea onChange={this.descriptionOnChange.bind(this)} value={this.state.descriptionValue} placeholder='Content' name='blog-description' />
        </fieldset>
        <button onClick={this.editBlog.bind(this)} type='submit'
        className='btn btn--color-positive submit-button'>Send</button>
      </form>
    </Single>);
  }
}

EditBlog.propTypes = {
};
