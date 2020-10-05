import React, {Component} from 'react'
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
      <section className='box-shadow rounded-light p-4 mt-1 m-1 flex center max-fit'>
        <h2 className="font-irish flex-1 text-shadow">Sign up</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute
