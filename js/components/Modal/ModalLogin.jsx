import React, {PropTypes} from 'react';
import Modal from './Modal'

class ModalLogin extends React.Component {
 constructor(props) {
   super(props);
 }

 render() {
       return (
         <Modal isOpen={this.props.isOpen} handleClose={this.props.handleClose} title='Login!'>
           <form onSubmit={this.props.handleLogin}>
         <fieldset>
           <label htmlFor="username">Username:</label>
           <input onChange={this.props.handleLoginOnChange}
                   value={this.props.loginValue} type="text" name="username"
                   id="username" placeholder="Your username" tabIndex="1" />
         </fieldset>

         <fieldset>
           <label htmlFor="text">Password:</label>
           <input type="password" name="password"
                   onChange={this.props.handlePasswordOnChange}
                   value={this.props.passwordValue} id="password"
                   placeholder="Your password" tabIndex="1" />
        </fieldset>
           <button onClick={this.props.handleLogin} type='submit'
           className='btn btn--color-positive submit-button'>Log in</button>
         </form>
       </Modal>
       )
   }
}

module.exports = ModalLogin;
export default ModalLogin;
