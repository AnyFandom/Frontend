import React, {PropTypes} from 'react';
import Single from '../components/Single'
import Api from '../Api'
import {NotificationManager} from 'react-notifications';

export default class EditUser extends React.Component {
  constructor(props) {
    super(props);
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  state = {
    user: {},
    avatarValue: '',
    descriptionValue: '',
  }

  async componentDidMount() {
    let user = await Api.loadUser(this.props.params.username)
    this.setState({user: user, avatarValue: user.avatar, descriptionValue: user.description})
    console.log('User', user);
  }

  descriptionOnChange(e) {
    e.preventDefault();
    this.setState({descriptionValue: e.target.value})
  }

  avatarOnChange(e) {
    e.preventDefault()
    this.setState({avatarValue: e.target.value})
  }

  async editUser(e) {
    e.preventDefault();
    await Api.editUser(this.state.user.username, this.state.avatarValue, this.state.descriptionValue)
    this.context.router.push(`/app/users/${this.state.user.username}`);
    NotificationManager.success('Пользователь отредактирован', 'Успешно')
  }

  render() {
    return (<Single title={`Edit user ${this.state.user.username}`} preview='http://previews.123rf.com/images/markovka/markovka1402/markovka140200090/26310850-Vector-seamless-pattern-childish-doodles-Pattern-set-of-different-school-travel-romantic-things-Enjo-Stock-Vector.jpg'>
      <form onSubmit={this.editUser.bind(this)}>
        <fieldset>
          <label htmlFor='avatar'>Avatar URL:</label>
          <input onChange={this.avatarOnChange.bind(this)} value={this.state.avatarValue} name='avatar' type='url' placeholder='Avatar URL' />
        </fieldset>
        <fieldset>
          <label htmlFor='description'>Description:</label>
          <textarea onChange={this.descriptionOnChange.bind(this)} value={this.state.descriptionValue} placeholder='Description' name='description' />
        </fieldset>
        <button type='submit'
        className='btn btn--color-positive submit-button'>Send</button>
      </form>
    </Single>);
  }
}

EditUser.propTypes = {
};
