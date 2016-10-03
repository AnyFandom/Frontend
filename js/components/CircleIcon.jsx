import React, {PropTypes} from 'react';

export default class CircleIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<span onClick={this.props.onClick} className={(this.props.className||'')+' circle-icon'}><i className="material-icons">{this.props.children}</i></span>);
  }
}

CircleIcon.propTypes = {
};
