import React, {PropTypes} from 'react';

export default class FandomItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let fandom = this.props.fandom
    return (<div className='fandom-item'>
      <img src={fandom.avatar} className='avatar' />
      <span>{fandom.title}</span>
    </div>);
  }
}

FandomItem.propTypes = {
};
