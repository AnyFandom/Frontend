import React, {PropTypes} from 'react';
import Api from '../Api'
import Post from '../components/Post'

export default class ShowFandom extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    fandom: {},
    posts: [],
  }

  async componentDidMount() {
    let fandom = await Api.loadFandom(this.props.params.id)
    this.setState({fandom: fandom})

    let posts = await Api.loadFandomPosts(this.props.params.id)
    this.setState({posts: posts})
  }

  render() {
    return (<div>
      <div className='fandom'>
        <img className='avatar' src={this.state.fandom.avatar} />
        <section className='info'>
          <span className='title'>{this.state.fandom.title}</span>
          <span className='description'>
            {this.state.fandom.description}
          </span>
        </section>
      </div>
      {this.state.posts.map(function(item){
        return <Post post={item} key={item.id} short />
      })}</div>);
  }
}

ShowFandom.propTypes = {
};
