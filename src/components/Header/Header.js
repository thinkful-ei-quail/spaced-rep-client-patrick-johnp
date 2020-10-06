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
      <div className="flex-1 flex-col rounded-top mx-2 center">
        <nav className="flex-1 flex-row rounded-top ">
          <Link to="/" className="text-white flex-1 text-dec-none font-irish tracking-wide linkhover"><h3>
            Dashboard</h3>
          </Link>

          <Link className="text-white mx-2 flex-1 text-dec-none font-irish tracking-wide linkhover"
            onClick={this.handleLogoutClick}
            to='/login'><h3>
              Logout</h3>
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav className="flex-1 flex-row rounded-top  center">
        <Link to='/login' className="text-white font-xl font-mono py-2 m-1 linkhover rounded-top flex-1 text-dec-none">Login</Link>
        {' '}
        <Link to='/register' className="text-white font-xl font-mono py-2 m-1 rounded-top linkhover flex-1 text-dec-none ">Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header className="height-cont bg-grad-to-r center rounded-tr-bl width-full mx-10 font-mono font-xl text-white flex ">

        <Link to='/' className="text-white text-dec-none font-header font-irish tracking-wide">
          <h1 className="flex-1 text-outline">
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
