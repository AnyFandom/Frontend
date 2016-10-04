import React, {PropTypes} from 'react';
import {Link} from 'react-router'


export default class FandomItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let fandom = this.props.fandom
    return (<div className='fandom-item'>
      <img src={fandom.avatar} className='avatar' />
      <span><Link to={`/app/fandoms/${fandom.id}`}>{fandom.title}</Link></span>
    </div>);
  }
}

FandomItem.propTypes = {
};
