import React, {Component} from 'react'
import ErrorBoundary from '../../components/ErrorBoundary';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import './RegistrationRoute.css';

class RegistrationRoute extends Component {
  static defaultProps={
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess=() => {
    const {history}=this.props
    history.push('/login')
  }

  render() {
    return (
      <section className='rounded-light p-4 mt-1 m-1 flex-col center max-fit width-full'>
        <h2 className="font-irish flex-1 text-shadow">Sign up</h2>
        <ErrorBoundary>
          <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}

          />
        </ErrorBoundary>
      </section>
    );
  }
}

export default RegistrationRoute
