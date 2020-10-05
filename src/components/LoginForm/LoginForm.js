import React, {Component} from 'react'
import {Input, Label} from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'
import Button from '../Button/Button'

class LoginForm extends Component {
  static defaultProps={
    onLoginSuccess: () => {}
  }

  static contextType=UserContext

  state={error: null}

  firstInput=React.createRef()

  handleSubmit=ev => {
    ev.preventDefault()
    const {username, password}=ev.target

    this.setState({error: null})

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value=''
        password.value=''
        this.context.processLogin(res.authToken)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({error: res.error})
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const {error}=this.state
    return (
      <form
        className='LoginForm flex font-xl font-mono '
        onSubmit={this.handleSubmit}
      >
        <div role='alert' className=" flex-1">
          {error&&<p>{error}</p>}
        </div>
        <div className="flex flex-1">
          <Label htmlFor='login-username-input ' className=" flex-1">
            Username
          </Label>
          <Input className="my-1 flex-1"
            ref={this.firstInput}
            id='login-username-input'
            name='username'
            required
          />
        </div>
        <div className="flex-1 flex">
          <Label htmlFor='login-password-input' className="flex-1">
            Password
          </Label>
          <Input className="my-1 flex-1"
            id='login-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <Button type='submit' className="rounded hover flex-1 my-2 font-xl font-mono ">
          Login
        </Button>
      </form>
    )
  }
}

export default LoginForm
