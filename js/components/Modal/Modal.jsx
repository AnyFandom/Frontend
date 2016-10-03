import React, {PropTypes} from 'react';

class Modal extends React.Component {
 constructor(props) {
   super(props);
 }

 render() {
       return (<div>
         <div className="modal" style={{display: this.props.isOpen? 'block' : 'none'}}>
           <div className="modal-content">
             <h3>{this.props.title}</h3>
             <span className="close" onClick={this.props.handleClose}><i className="material-icons">close</i></span>
             {this.props.children}
           </div>
         </div></div>
       )
   }
}

export default Modal;
