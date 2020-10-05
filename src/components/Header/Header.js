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

  renderLogoutLink() {
    return (
      <div className="header-cont height-full flex">

        <span className="text-white">
          {this.context.user.name}
        </span>
        <nav>
          <Link className=""
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to='/login' className="text-white py-2 m-1 hover rounded-top flex-1 text-dec-none">Login</Link>
        {' '}
        <Link to='/register' className="text-white py-2 m-1 rounded-top hover flex-1 text-dec-none ">Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header className="header-cont background-green center width-full p-4 text-white height-full flex">
        <h1 className="backgorund-green height-full flex-2">
          <Link to='/' className="text-white  text-dec-none font-irish tracking-wide">
            Spaced repetition
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          :this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
