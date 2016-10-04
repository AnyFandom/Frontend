import React, {PropTypes} from 'react';
import {Link} from 'react-router'

export default class BlogItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let blog = this.props.blog
    return (<div className='blog-item'>
      <img src={blog.avatar} />
      <span><Link to={`/app/blogs/${blog.id}`}>{blog.title}</Link></span>
    </div>);
  }
}

BlogItem.propTypes = {
};
