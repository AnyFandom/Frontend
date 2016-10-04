import React, {PropTypes} from 'react';
import BlogItem from './BlogItem'

export default class BlogList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className='blog-list'>
      {this.props.blogs.map(function(item){
        return <BlogItem key={`blogItem_${item.id}`} blog={item} />
      })}
    </div>);
  }
}

BlogList.propTypes = {
};
