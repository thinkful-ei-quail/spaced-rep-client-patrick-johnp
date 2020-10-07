import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType=UserContext

  handleLogoutClick=() => {
    this.context.processLogout()
  }
  // {this.context.user.username}'s
  renderLogoutLink() {
    return (

      <nav className="flex-1 flex-row-nowrap justify m-1 pos-bottom ">
        <Link to="/"
          className="text-white font-nav flex-1  mx-2  text-dec-none
          tracking-wide linkhover m-1 font-mono">
          {this.context.user.username}
        </Link>

        <Link
          className="text-white mx-2 font-nav flex-1 text-dec-none
           tracking-wide linkhover m-1 font-mono"
          onClick={this.handleLogoutClick}
          to='/login'>
          Logout
        </Link>
      </nav>

    )
  }

  renderLoginLink() {
    return (
      <nav className="flex-1 flex-col pos-bottom justify m-1 ">
        <Link to='/login'
          className="text-white mx-2 font-nav flex-1 text-dec-none
      tracking-wide linkhover m-1">
          Login</Link>
        {' '}
        <Link to='/register'
          className="text-white mx-2 font-nav flex-1 text-dec-none
       tracking-wide linkhover m-1">
          Register</Link>
      </nav>
    )
  }

  render() {
    return (
      <header className="bg-grad-to-r flex-1 justify center rounded-tr-bl
      width-full m-1 font-mono font-xl text-white flex-row-wrap height-fit">

        <Link to='/' className="text-white text-dec-none font-header font-irish tracking-widest">
          <h1 className="linkhover text-outline">
            Spaced repetition
            </h1>
        </Link>

        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          :this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
