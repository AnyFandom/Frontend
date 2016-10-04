import React, {PropTypes} from 'react';
import CircleIcon from './CircleIcon'
import ModalLogin from './Modal/ModalLogin'
import ModalRegister from './Modal/ModalRegister'

import {Link} from 'react-router';

import Storage from '../Storage'

import Api from '../Api'
import Core from '../Core'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    loginModalIsOpen: false,
    registerModalIsOpen: false,

    loginValue: '',
    passwordValue: '',

    current_page: 'index',
  }

  handleLoginModalClick() {
    this.setState({loginModalIsOpen: this.state.loginModalIsOpen? false : true})
    console.log(this.state);
  }

  handleLoginOnChange(e) {
    this.setState({loginValue: e.target.value})
  }

  async handleLogin(e) {
    e.preventDefault()
    await Api.login(this.state.loginValue, this.state.passwordValue)
    location.reload()
  }

  handleRegisterModalClick(e) {
    e.preventDefault()
    this.setState({registerModalIsOpen: this.state.registerModalIsOpen? false : true})
    console.log(this.state);
  }

  handlePasswordOnChange(e) {
    this.setState({passwordValue: e.target.value})
  }

  async handleRegister(e) {
    e.preventDefault()
    await Api.register(this.state.loginValue, this.state.passwordValue)
    location.reload()
  }

  handleLogout(e) {
    Storage.set('token', false)
    Storage.set('user', false)
    location.reload()
  }

  componentDidMount() {
    Core.listen('current-page-update', function(page) {
      this.setState({current_page: page})
      console.log('Current page', page)
    }.bind(this))
  }

  render() {
    let user = Storage.get('user', {})
    return (<div><nav className='navbar'>
      <ul className='navbar-left'>
        <li className={this.state.current_page=='posts'? 'active':''}>
          <Link to='/app/'>Posts</Link>
        </li>
        <li className={this.state.current_page=='users'? 'active':''}>
          <Link to='/app/users'>Users</Link>
        </li>
        <li className={this.state.current_page=='fandoms'? 'active':''}>
          <Link to='/app/fandoms'>Fandoms</Link>
        </li>
      </ul>
      <ul className='navbar-right'>
        <li>
          <a href='#'>
            <CircleIcon>notifications_none</CircleIcon>
          </a>
        </li>
        <li style={{display: user.id? 'none' : 'block'}}>
          <a href='#' onClick={this.handleLoginModalClick.bind(this)}>
            <CircleIcon>person</CircleIcon>
          </a>
        </li>
        <li style={{display: user.id? 'none' : 'block'}}>
          <a href='#' onClick={this.handleRegisterModalClick.bind(this)}>
            <CircleIcon>person_add</CircleIcon>
          </a>
        </li>
        <li style={{display: user.id? 'block' : 'none'}}>
          <Link to='/app/posts/add'>
            <CircleIcon>add</CircleIcon>
          </Link>
        </li>
        <li style={{display: user.id? 'block' : 'none'}}>
          <Link to={`/app/users/${user.username}/edit`}>
            <CircleIcon>settings</CircleIcon>
          </Link>
        </li>
        <li style={{display: user.id? 'block' : 'none'}} onClick={this.handleLogout}>
          <a href='#'>
            <img className='navbar-avatar' src={user.avatar} />
            <span className='navbar-login'>{user.username}</span>
          </a>
        </li>
      </ul>
    </nav>      <ModalLogin
                  isOpen={this.state.loginModalIsOpen}
                  handleClose={this.handleLoginModalClick.bind(this)}
                  handleLoginOnChange={this.handleLoginOnChange.bind(this)}
                  loginValue={this.state.loginValue}
                  handlePasswordOnChange={this.handlePasswordOnChange.bind(this)}
                  passwordValue={this.state.passwordValue}
                  handleLogin={this.handleLogin.bind(this)}
                />

                <ModalRegister
                    isOpen={this.state.registerModalIsOpen}
                    handleClose={this.handleRegisterModalClick.bind(this)}
                    handleLoginOnChange={this.handleLoginOnChange.bind(this)}
                    loginValue={this.state.loginValue}
                    handlePasswordOnChange={this.handlePasswordOnChange.bind(this)}
                    passwordValue={this.state.passwordValue}
                    handleRegister={this.handleRegister.bind(this)}
                  /></div>);
  }
}

Navbar.propTypes = {
};
