import React, {PropTypes} from 'react';
import Post from '../components/Post'

export default class PostList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      {this.props.posts.map(function(item){
        return <Post post={item} key={item.id} short />
      })}
    </div>);
  }
}

PostList.propTypes = {
};
