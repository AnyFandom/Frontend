import React, {PropTypes} from 'react';
import Checkbox from '../components/Checkbox';
import Single from '../components/Single';
import Api from '../Api';
import {NotificationManager} from 'react-notifications';

export default class EditFandom extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    fandom: {},
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

  async editFandom(e) {
    e.preventDefault();
    console.log(this.state.description);
    await Api.editFandom(this.state.fandom.id, this.state.titleValue, this.state.descriptionValue, this.state.avatarValue)
    this.context.router.push(`/app/fandoms/${this.state.fandom.id}`);
    NotificationManager.success('Пост отредактирован', 'Успешно')
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  async componentDidMount() {
    let fandom = await Api.loadFandom(this.props.params.id)
    this.setState(
      {
        fandom: fandom,
        titleValue: fandom.title,
        descriptionValue: fandom.description,
        avatarValue: fandom.avatar,
      }
    )
  }

  render() {
    return (<Single title='Edit Fandom'
              avatar = 'https://www.colourbox.com/avatar/9364894-vector-seamless-pattern-childish-doodles-pattern-set-of-different-school-travel-romantic-things-enjoy-life-concept-use-for-wallpaper-pattern-fills-web-page-background-surface-textures.jpg'
            >
      <form>
        <fieldset>
          <label htmlFor='fandom-title'>Fandom avatar URL:</label>
          <input onChange={this.avatarOnChange.bind(this)} value={this.state.avatarValue} name='fandom-title' type='url' placeholder='Avatar URL' />
        </fieldset>
        <fieldset>
          <label htmlFor='fandom-title'>Fandom title:</label>
          <input onChange={this.titleOnChange.bind(this)} value={this.state.titleValue} name='fandom-title' type='text' placeholder='Title' />
        </fieldset>
        <fieldset>
          <label htmlFor='fandom-description'>Fandom description:</label>
          <textarea onChange={this.descriptionOnChange.bind(this)} value={this.state.descriptionValue} placeholder='Content' name='fandom-description' />
        </fieldset>
        <button onClick={this.editFandom.bind(this)} type='submit'
        className='btn btn--color-positive submit-button'>Send</button>
      </form>
    </Single>);
  }
}

EditFandom.propTypes = {
};
