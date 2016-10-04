import React, {PropTypes} from 'react';
import Checkbox from '../components/Checkbox';
import Single from '../components/Single';
import Api from '../Api';
import {NotificationManager} from 'react-notifications';
import Core from '../Core'

export default class AddPost extends React.Component {
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
    blogs: [],

    current_fandom: {},
    current_blog: {},

    fandomValue: 0,
    blogValue: 0,
    titleValue: '',
    contentValue: '',
    previewValue: '',
  }

  async componentDidMount() {
    Core.push('current-page-update', 'fandoms')
    let fandoms = await Api.loadFandoms()
    this.setState({fandoms: fandoms})
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
    let new_location = await Api.addPost(this.state.titleValue, this.state.contentValue, this.state.previewValue, this.state.blogValue)
    this.context.router.push(`/app${new_location}`);
    NotificationManager.success('Пост добавлен', 'Успешно')
  }

  handleCheckClick(e) {
    console.log('Check!');
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
    return (<Single title='Add Post'
              preview = 'https://www.colourbox.com/preview/9364894-vector-seamless-pattern-childish-doodles-pattern-set-of-different-school-travel-romantic-things-enjoy-life-concept-use-for-wallpaper-pattern-fills-web-page-background-surface-textures.jpg'
            >
      <form>
        <fieldset>
          <label htmlFor='fandom'>Fandom:</label>
          <select name='fandom' value={this.state.fandomValue} onChange={this.onFandomChange.bind(this)}>
            <option />
            {this.state.fandoms.map(function(item){
              return <option key={`fandom_${item.id}`} value={item.id}>{item.title}</option>
            })}
          </select>
        </fieldset>
        {this.state.blogs.length? <fieldset>
          <label htmlFor='blog'>Blog:</label>
          <select name='blog' value={this.state.blogValue} onChange={this.onBlogChange.bind(this)}>
            <option />
            {this.state.blogs.map(function(item){
              return <option key={`fandom_${item.id}`} value={item.id}>{item.title}</option>
            })}
          </select>
        </fieldset>:''}
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
