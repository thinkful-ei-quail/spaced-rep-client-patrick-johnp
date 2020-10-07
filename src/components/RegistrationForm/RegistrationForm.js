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
      <form className='flex-col center box-shadow-xl p-4 rounded justify
      height-fit font-nav font-mono '
        onSubmit={this.handleSubmit}>
        <div className=" flex-1" role="alert">
          {error&&<p className="font-xxl text-red">{error}</p>}
        </div>
        <div className='flex-row justify flex-1'>
          <Label htmlFor="registration-name-input"
            className="flex-1">
            Nick Name
            <Required />
          </Label>
          <Input
            placeholder="nick name here"
            ref={this.firstInput}
            id="registration-name-input"
            name="name"
            required
            className="flex-1 border-none font-xl"
          />
        </div>
        <div className='flex-1 justify flex-row'>
          <Label htmlFor="registration-username-input"
            className="flex-1">
            Username
            <Required />
          </Label>
          <Input
            id="registration-username-input"
            name="username" required
            placeholder="username here"
            className='flex-1 border-none font-xl' />
        </div>
        <div className='flex-1 justify flex-row'>
          <Label htmlFor="registration-password-input"
            className='flex-1'>
            Password
            <Required />
          </Label>
          <Input
            placeholder="password here"
            id="registration-password-input"
            name="password"
            type="password"
            required
            className='flex-1 border-none font-xl'
          />
        </div>
        <div className='flex-1 justify flex-row'>
          <Button type="submit"
            className='rounded hoverbutt border-none flex-1
            transition center m-2 font-xxl font-mono '
          >Sign up</Button>
          {'  '}
          <Link to="/login"
            className="flex-1 text-green hoverbutt transition">
            Already have an account?</Link>
        </div>
      </form>
    );
  }
}

export default RegistrationForm;
