import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Input, Required, Label} from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import Button from '../Button/Button';
import './RegistrationForm.css';

class RegistrationForm extends Component {
  static defaultProps={
    onRegistrationSuccess: () => {},
  };

  state={error: null};

  firstInput=React.createRef();

  handleSubmit=(ev) => {
    ev.preventDefault();
    const {name, username, password}=ev.target;
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then((user) => {
        name.value='';
        username.value='';
        password.value='';
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({error: res.error});
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const {error}=this.state;
    return (
      <form className='registration-form flex font-xl font-mono '
        onSubmit={this.handleSubmit}>
        <div className=" flex-1" role="alert">{error&&<p>{error}</p>}</div>
        <div className='flex flex-1'>
          <Label htmlFor="registration-name-input" className="flex-1">
            Enter your name
            <Required />
          </Label>
          <Input
            ref={this.firstInput}
            id="registration-name-input"
            name="name"
            required
            className="flex-1 my-1"
          />
        </div>
        <div className='flex flex-1'>
          <Label htmlFor="registration-username-input" className="flex-1">
            Choose a username
            <Required />
          </Label>
          <Input id="registration-username-input" name="username" required className='flex-1 my-1' />
        </div>
        <div className='flex-1 flex'>
          <Label htmlFor="registration-password-input" className='flex-1'>
            Choose a password
            <Required />
          </Label>
          <Input
            id="registration-password-input"
            name="password"
            type="password"
            required
            className='flex-1 my-1'
          />
        </div>
        <footer className='flex-1 flex'>
          <Button type="submit" className='rounded flex-1 hover px-1 py-2 font-xl font-mono '>Sign up</Button>{' '}
          <Link to="/login" className="flex-1">Already have an account?</Link>
        </footer>
      </form>
    );
  }
}

export default RegistrationForm;
