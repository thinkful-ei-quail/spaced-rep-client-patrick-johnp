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
      <div className="header-cont flex ">

        <span className="text-white ">
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
        <Link to='/login' className="text-white font-xl font-mono py-2 m-1 hover rounded-top flex-1 text-dec-none">Login</Link>
        {' '}
        <Link to='/register' className="text-white font-xl font-mono py-2 m-1 rounded-top hover flex-1 text-dec-none ">Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header className="header-cont bg-grad-to-r center width-full text-white flex">
        <h1 className="backgorund-green  flex-2">
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
