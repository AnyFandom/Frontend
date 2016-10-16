var reqwest = require('reqwest');
import Storage from './Storage'
import Emitter from './Emitter'
import {NotificationManager} from 'react-notifications';

class Api {

  /*
   * Переменные, основная функция request
   */

  http_host = 'http://localhost'+':5000'

  async request(url, method='get', data={}) {
    return new Promise(function(resolve, reject){

      /*
       * Если есть токен, и мы получаем не токен, то токен не отправляем.
       */
      if (Storage.get('token') && url != '/token') {
        data.token = Storage.get('token')
      }

      /*
       * Подготовка данных для отправки через get
       */
      if (method == 'get') {
        let tmp = []
        for (let key in data) {
          tmp.push({name: key, value: data[key]})
        }
        data = tmp
      }

      let options = {
        url: this.http_host+url,
        method: method,
        type: 'json',
        data: data,
      }

      if (Storage.get('debug')) {
        console.log(url, options)
      }

      reqwest(options).then(
        function(data) {
          if (data.status != 'success') {
            console.warn(data.data.code, data.data.message);
            NotificationManager.error(data.data.code, data.data.message)
            reject(data)
          } else {
            resolve(data.data)
          }
        },
        function(resp) {
          let data = JSON.parse(resp.responseText)
          if (data.status != 'success') {
            console.warn(data.data.code, data.data.message);
            NotificationManager.error(data.data.code, data.data.message)
            reject(data)
          } else {
            resolve(data.data)
          }
        }
      )
    }.bind(this))
  }

  /*
   * Логин, регистрация и прочее для юзера
   */

  async getUserCurrent() {
    let data = await this.request('/users/current')
    Storage.set('user', data.user)
    Emitter.push('update-user-current')
    return
  }

  async login(username, password) {
    let data = await this.request(
      '/token',
      'post',
      {
        username: username,
        password: password
      }
    )
    Storage.set('token', data.token);
    await this.getUserCurrent();

  }

  async register(username, password) {
    let data = await this.request(
      '/users',
      'post',
      {
        username: username,
        password: password
      }
    )
    await this.login(username, password)
  }

  /*
   * Посты
   */

  async loadPosts() {
    let data = await this.request('/posts')
    return data.posts
  }

  async loadPost(id) {
    let data = await this.request(`/posts/${id}`)
    return data.post
  }

  async loadPostComments(id) {
    let data = await this.request(`/posts/${id}/comments`, 'get', {threaded: 1})
    return data.comments
  }

  async addComment(post_id, parent_id, content) {
    let data = await this.request(
      '/comments',
      'post',
      {
        post: post_id,
        parent: parent_id,
        content: content
      }
    )
    return data.Location
  }

  async deleteComment(id) {
    await this.request(`/comments/${+id}`, 'delete')
    return
  }

  async editComment(id, content) {
    await this.request(`/comments/${id}`, 'patch', {content: content})
    return
  }

  async addPost(title, content, preview, blog_id=1) {
    let data = await this.request(
      '/posts',
      'post',
      {
        title: title,
        content: content,
        preview: preview,
        blog: blog_id
      }
    )
    return data.Location
  }

  async deletePost(id) {
    await this.request('/posts/'+id, 'delete')
    return
  }

  async editPost(id, title, content, preview, blog_id=1) {
    let data = await this.request(
      `/posts/${id}`,
      'patch',
      {
        title: title,
        content: content,
        preview: preview,
        blog: blog_id
      }
    )
    return
  }

  async loadUsers() {
    let data = await this.request('/users')
    return data.users
  }

  async loadUser(user) {
    if (typeof(user)=='string') {
      var mode = 'profile'
    } else {
      var mode = 'id'
    }
    let data = await this.request(`/users/${mode}/${user}`)
    return data.user
  }

  async loadUserPosts(user) {
    if (typeof(user)=='string') {
      var mode = 'profile'
    } else {
      var mode = 'id'
    }
    let data = await this.request(`/users/${mode}/${user}/posts`)
    return data.posts
  }

  async editUser(user, avatar, description) {
    if (typeof(user)=='string') {
      var mode = 'profile'
    } else {
      var mode = 'id'
    }
    let data = await this.request(
      `/users/${mode}/${user}`,
      'patch',
      {
        avatar: avatar,
        description: description,
      }
    )
    return
  }

  async loadFandoms() {
    let data = await this.request('/fandoms')
    return data.fandoms
  }

  async loadFandom(id) {
    let data = await this.request(`/fandoms/${id}`)
    return data.fandom
  }

  async loadFandomPosts(id) {
    let data = await this.request(`/fandoms/${id}/posts`)
    return data.posts
  }

  async loadBlogs(fandom_id) {
    let data = await this.request(`/fandoms/${fandom_id}/blogs`)
    return data.blogs
  }

  async loadBlog(id) {
    let data = await this.request(`/blogs/${id}`)
    return data.blog
  }

  async loadBlogPosts(id) {
    let data = await this.request(`/blogs/${id}/posts`)
    return data.posts
  }

  async addFandom(title, description, avatar) {
    let data = await this.request(
      '/fandoms',
      'post',
      {
        title: title,
        description: description,
        avatar: avatar,
      }
    )
    return data.Location
  }

  async editFandom(id, title, description, avatar) {
    let data = await this.request(
      `/fandoms/${id}`,
      'patch',
      {
        title: title,
        description: description,
        avatar: avatar,
      }
    )
    return
  }

  async deleteFandom(id) {
    await this.request(`/fandoms/${id}`, 'delete')
    return
  }

  async editBlog(id, title, description, avatar) {
    let data = await this.request(
      `/blogs/${id}`,
      'patch',
      {
        title: title,
        description: description,
        avatar: avatar,
      }
    )
    return
  }

  async addBlog(title, description, avatar, fandom) {
    let data = await this.request(
      '/blogs',
      'post',
      {
        title: title,
        description: description,
        avatar: avatar,
        fandom: fandom
      }
    )
    return data.Location
  }

  async deleteBlog(id) {
    await this.request(`/blogs/${id}`, 'delete')
    return
  }

  async deleteUser(id) {
    await this.request(`/users/id/${id}`, 'delete')
    return
  }

  async loadPostLastComment(id) {
    let data = await this.request(`/posts/${id}/comments/last`)
    return data.last_comment
  }

  async setPostLastComment(post, comment) {
    let data = await this.request(`/posts/${post}/comments/last`, 'patch', {comment:comment})
    return data.last_comment
  }

}

export default new Api()
