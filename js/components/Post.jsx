import React, {PropTypes} from 'react';
import dateformat from 'dateformat'
import CircleIcon from './CircleIcon'
import ImageModal from './Modal/ImageModal'
import {Link} from 'react-router';
import Storage from '../Storage'
import Api from '../Api'
import Emitter from '../Emitter';
import {NotificationManager} from 'react-notifications';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  async handleDeleteClick(e) {
    console.log('delete')
    e.preventDefault()
    if (confirm('Вы уверены, что хотите удалить пост?')) {
      await Api.deletePost(this.props.post.id)
      NotificationManager.success('Пост удален', 'Успешно')
      Emitter.push('post-list-update')
    }
  }

  render() {
    let user = Storage.get('user') || {}
    var post = this.props.post
    if (!post.id) {
      post = {
        owner: {},
        blog: {
          fandom: {}
        },
        date: new Date()
      }
    }

    var fish = `Действие берет начало в ноябре 2010 года и разворачивается в поле аттрактора β.
Впавший в отчаяние Ринтаро Окабэ изо всех сил пытается оправиться от последней неудачной попытки изменить будущее. Стремясь забыть все то, что он пережил в прошлом, и избавиться от терзающих его сознание болезненных воспоминаний, он решает забросить свое второе «я» в лице безумного ученого и начать жить как подобает обычному студенту. Как только, казалось бы, жизнь начинает налаживаться, он внезапно встречает Махо Хиядзё, знакомую Курису Макисэ из американского университета. Махо рассказывает Ринтаро, что в их лаборатории уже начали тестирование нового изобретения, которое предоставляет возможность хранить память человека и способно воссоздать его личностные качества со всеми особенностями характера внутри себя. Приобретение возможности симулировать с помощью этого устройства память Курису приносит в жизнь Окабэ новый переполох, как будто бы возвращая его в пугающее прошлое. Он даже подумать не мог, что это принесет столько мучений и новых неожиданных последствий в предстоящие времена.`

    return (<div className='post'>
      <header>
        <img className='post-header-img' src={post.preview_image || 'https://www.betaseries.com/images/fonds/original/3086_1410380644.jpg'} />
        <div className='post-actions'>
          {user.id==post.owner.id? <div>
            <CircleIcon onClick={this.handleDeleteClick.bind(this)}>delete</CircleIcon>
            <Link to={`/app/posts/${post.id}/edit`}><CircleIcon>mode_edit</CircleIcon></Link>
            </div> : ''}
            <ImageModal img={post.preview_image}><CircleIcon>crop_original</CircleIcon></ImageModal>

        </div>
      </header>
      <section className='post-info'>
        <span className='info'>
          {post.owner.username || 'ADMIN'} в {post.blog.fandom.title || 'Аниме'} / {post.blog.title || 'Steins;Gate'}
        </span>
        <span className='date'>
          {dateformat(new Date(post.date), "dddd, mm.d.yy, H:MM")}
        </span>
        <Link to={'/app/posts/'+post.id}><span className='post-title'>{post.title || 'Steins;Gate ZERO'}</span></Link>
      </section>
      <section className='post-content'>
        {post.content || fish}
      </section>
      <footer>
        <ul className='tags'>
          <li><a>Steins;Gate</a></li>
          <li><a>Steins;Gate 0</a></li>
          <li><a>Steins;Gate ZERO</a></li>
          <li><a>Анонс</a></li>
        </ul>
        <ul className='info'>
          <li style={{display: this.props.short? 'flex' : 'none'}}><i className="material-icons">chat_bubble_outline</i> {post.comment_count}</li>
          <li><i className="material-icons">bookmark_outline</i> 0</li>
          <li className='cut' style={{display: this.props.short? 'flex' : 'none'}}><Link to={'/app/posts/'+post.id}>Читать дальше</Link></li>
        </ul>
      </footer>
    </div>);
  }
}

Post.propTypes = {
  post: React.PropTypes.object.isRequired
};
