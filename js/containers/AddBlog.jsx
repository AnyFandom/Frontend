import React, {PropTypes} from 'react';
import Checkbox from '../components/Checkbox';
import Single from '../components/Single';
import Api from '../Api';
import {NotificationManager} from 'react-notifications';
import Emitter from '../Emitter'

export default class AddBlog extends React.Component {
  constructor(props) {
    super(props);
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  state = {
    fandoms: [],

    current_fandom: {},

    fandomValue: 0,
    blogValue: 0,
    titleValue: '',
    descriptionValue: '',
    avatarValue: '',
  }

  async componentDidMount() {
    Emitter.push('current-page-update', 'fandoms')
    let fandoms = await Api.loadFandoms()
    this.setState({fandoms: fandoms})
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

  async addBlog(e) {
    e.preventDefault();
    console.log(this.state.description);
    let new_location = await Api.addBlog(this.state.titleValue, this.state.descriptionValue, this.state.avatarValue, this.state.fandomValue)
    this.context.router.push(`/app${new_location}`);
    NotificationManager.success('Блог добавлен', 'Успешно')
  }

  handleCheckClick(e) {
    console.log('Check!');
  }

  async onFandomChange(e) {
    this.setState({fandomValue: e.target.value})
  }

  render() {
    return (<Single title='Add Blog'
              avatar = 'https://www.colourbox.com/avatar/9364894-vector-seamless-pattern-childish-doodles-pattern-set-of-different-school-travel-romantic-things-enjoy-life-concept-use-for-wallpaper-pattern-fills-web-page-background-surface-textures.jpg'
            >
      <form>
        <fieldset>
          <label htmlFor='fandom'>Fandom:</label>
          <select name='fandom' onChange={this.onFandomChange.bind(this)}>
            <option />
            {this.state.fandoms.map(function(item){
              return <option key={`fandom_${item.id}`} value={item.id}>{item.title}</option>
            })}
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor='blog-title'>Blog avatar image URL:</label>
          <input onChange={this.avatarOnChange.bind(this)} name='blog-title' type='url' placeholder='Preview image URL' />
        </fieldset>
        <fieldset>
          <label htmlFor='blog-title'>Blog title:</label>
          <input onChange={this.titleOnChange.bind(this)} name='blog-title' type='text' placeholder='Title' />
        </fieldset>
        <fieldset>
          <label htmlFor='blog-description'>Blog description:</label>
          <textarea onChange={this.descriptionOnChange.bind(this)} placeholder='Content' name='blog-description' />
        </fieldset>
      <Checkbox handleClick={this.handleCheckClick} title='Test field' checked={true} label='check!' />
        <button onClick={this.addBlog.bind(this)} type='submit'
        className='btn btn--color-positive submit-button'>Send</button>
      </form>
    </Single>);
  }
}

AddBlog.propTypes = {
};
