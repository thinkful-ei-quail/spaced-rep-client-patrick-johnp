import React, {Component} from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'

class LoginRoute extends Component {
  static defaultProps={
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess=() => {
    const {location, history}=this.props
    const destination=(location.state||{}).from||'/'
    history.push(destination)
  }

  render() {
    return (
      <section className="box-shadow rounded-light p-4 mt-1 m-1 flex flex-1">
        <h2 className=" font-irish flex-2 text-shadow">Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    );
  }
}

export default LoginRoute
