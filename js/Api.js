var reqwest = require('reqwest');
import Storage from './Storage'
import Emitter from './Emitter'
import {NotificationManager} from 'react-notifications';

class Api {

  /*
   * Переменные, основная функция request
   */

  http_host = location.protocol+'//'+location.hostname+':9000';

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

      for (let key in data) {
        if (data[key] == null) {
          delete data[key]
        }
      }
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

      function callback(data) {
        if (data.include) {
          if (Storage.get('debug')) {
            console.log(data.include);
          }
          for (let key in data.include) {
            let i = data.include[key]
            Storage.set(i.type+"_"+i.data.id, i.data)
            if (Storage.get('debug')) {
              console.log("Include:", i.data);
            }
          }
        }
        if (data.status != 'success') {
          console.warn(data.message);
          NotificationManager.error("Error", data.message)
          reject(data)
        } else {
          resolve(data.data)
        }
      }

      function errorCallback(resp) {
        callback(JSON.parse(resp.responseText))
      }


      reqwest(options).then(
        callback, errorCallback
      )
    }.bind(this))
  }

  /*
   * Логин, регистрация и прочее для юзера
   */

  async getUserCurrent() {
    let data = await this.request('/users/current')
    Storage.set('user', data)
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
    return data
  }

  async loadPost(id) {
    let data = await this.request(`/posts/${id}`)
    console.log(data);
    return data
  }

  async loadPostComments(id) {
    let data = await this.request(`/posts/${id}/comments`, 'get', {threaded: 1})
    return data
  }

  async addComment(post_id, parent_id, content) {
    let data = await this.request(
      '/comments',
      'post',
      {
        postId: post_id,
        parentId: parent_id,
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
        preview_image: preview.length?preview:null,
        blogId: blog_id
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
        preview_image: preview.length?preview:null,
        blogId: blog_id
      }
    )
    return
  }

  async loadUsers() {
    let data = await this.request('/users')
    return data
  }

  async loadUser(user) {
    if (typeof(user)=='string') {
      var mode = 'profile'
    } else {
      var mode = 'id'
    }
    let data = await this.request(`/users/${mode}/${user}`)
    return data
  }

  async loadUserPosts(user) {
    if (typeof(user)=='string') {
      var mode = 'profile'
    } else {
      var mode = 'id'
    }
    let data = await this.request(`/users/${mode}/${user}/posts`)
    return data
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
        avatar: avatar.length?avatar:null,
        description: description,
      }
    )
    return
  }

  async loadFandoms() {
    let data = await this.request('/fandoms')
    return data
  }

  async loadFandom(id) {
    let data = await this.request(`/fandoms/${id}`)
    return data
  }

  async loadFandomPosts(id) {
    let data = await this.request(`/fandoms/${id}/posts`)
    return data
  }

  async loadBlogs(fandom_id) {
    let data = await this.request(`/fandoms/${fandom_id}/blogs`)
    return data
  }

  async loadBlog(id) {
    let data = await this.request(`/blogs/${id}`)
    return data
  }

  async loadBlogPosts(id) {
    let data = await this.request(`/blogs/${id}/posts`)
    return data
  }

  async addFandom(title, description, avatar) {
    let options = {
      title: title,
      description: description,
      avatar: avatar.length?avatar:null,
    }
    console.log('OPTIONS: ', options);
    let data = await this.request(
      '/fandoms',
      'post',
      options
    )
    console.log(avatar.length?avatar:null)
    return data.Location
  }

  async editFandom(id, title, description, avatar) {
    let data = await this.request(
      `/fandoms/${id}`,
      'patch',
      {
        title: title,
        description: description,
        avatar: avatar.length?avatar:null,
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
        avatar: avatar.length?avatar:null,
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
        avatar: avatar.length?avatar:null,
        fandomId: fandom
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

  async loadCommentsNew(post) {
    let data = await this.request(`/posts/${post}/comments/new`)
    return data
  }

  async setCommentRead(comment) {
    let data = await this.request(`/comments/${comment}/read`, 'post')
    return data
  }

  async setPostCommentsReadAll(post) {
    let data = await this.request(`/posts/${post}/comments/new`, 'post')
    return data
  }

}

export default new Api()
