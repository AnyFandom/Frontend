import React, {PropTypes} from 'react';
import Checkbox from '../components/Checkbox';
import Single from '../components/Single';
import Api from '../Api';
import {NotificationManager} from 'react-notifications';
import Emitter from '../Emitter'

export default class AddFandom extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Emitter.push('current-page-update', 'fandoms')
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  state = {
    titleValue: '',
    descriptionValue: '',
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

  async addFandom(e) {
    e.preventDefault();
    console.log(this.state.description);
    let new_location = await Api.addFandom(this.state.titleValue, this.state.descriptionValue, this.state.avatarValue)
    this.context.router.push(`/app${new_location}`);
    NotificationManager.success('Фэндом добавлен', 'Успешно')
  }

  async onFandomChange(e) {
    this.setState({fandomValue: e.target.value})
    let blogs = await Api.loadBlogs(e.target.value)
    this.setState({blogs: blogs})
  }
  async onBlogChange(e) {
    this.setState({blogValue: e.target.value})
  }

  render() {
    return (<Single title='Add Fandom'
              avatar = 'https://www.colourbox.com/avatar/9364894-vector-seamless-pattern-childish-doodles-pattern-set-of-different-school-travel-romantic-things-enjoy-life-concept-use-for-wallpaper-pattern-fills-web-page-background-surface-textures.jpg'
            >
      <form>
        <fieldset>
          <label htmlFor='post-title'>Avatar URL:</label>
          <input onChange={this.avatarOnChange.bind(this)} name='post-title' type='url' placeholder='Avatar URL' />
        </fieldset>
        <fieldset>
          <label htmlFor='post-title'>Fandom title:</label>
          <input onChange={this.titleOnChange.bind(this)} name='post-title' type='text' placeholder='Title' />
        </fieldset>
        <fieldset>
          <label htmlFor='post-description'>Fandom description:</label>
          <textarea onChange={this.descriptionOnChange.bind(this)} placeholder='description' name='post-description' />
        </fieldset>
        <button onClick={this.addFandom.bind(this)} type='submit'
        className='btn btn--color-positive submit-button'>Send</button>
      </form>
    </Single>);
  }
}

AddFandom.propTypes = {
};
