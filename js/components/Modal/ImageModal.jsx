import React, {PropTypes} from 'react';

export default class ImageModal extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isOpen: false,
  }

  changeIsOpen(e) {
    e.preventDefault()
    this.setState({isOpen: this.state.isOpen? false:true})
  }

  render() {
    return (<div>
      <div onClick={this.changeIsOpen.bind(this)}>{this.props.children}</div>
      <div className={'image-modal-wrapper '+(this.state.isOpen? '':'hidden')} onClick={this.changeIsOpen.bind(this)}>
       <div className='image-modal'>
         <div className='image'>
           <img src={this.props.img} />
         </div>
         <section className='content'>
           <ul className='tags'>
             <li><a>#test</a></li>
             <li><a>#ТЕСТ</a></li>
             <li><a>#фыр</a></li>
             <li><a>#фырфырфыр</a></li>
           </ul>
         </section>
       </div>
      </div>
    </div>);
  }
}

ImageModal.propTypes = {
};
