import React, {PropTypes} from 'react';

export default class Single extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let style = {
      backgroundImage: 'url('+this.props.preview+')'
    }
    return (<div className='single'>
      <div className='header-wrapper' style={style}>
        <div className='header'>
          <span className='title'>{this.props.title}</span>
        </div>
      </div>
      <section className='content'>
        {this.props.children}
      </section>
    </div>);
  }
}

Single.propTypes = {
};
