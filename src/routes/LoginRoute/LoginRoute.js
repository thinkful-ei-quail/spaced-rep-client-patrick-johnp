import React, {Component} from 'react'
import ErrorBoundary from '../../components/ErrorBoundary'
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
      <section className="box-shadow rounded-light p-4 mt-1 m-1 flex-col-wrap max-fit width-full center ">
        <h2 className=" font-irish flex-1 text-shadow">Login</h2>
        <ErrorBoundary>
          <LoginForm
            onLoginSuccess={this.handleLoginSuccess}
          />
        </ErrorBoundary>
      </section>
    );
  }
}

export default LoginRoute
