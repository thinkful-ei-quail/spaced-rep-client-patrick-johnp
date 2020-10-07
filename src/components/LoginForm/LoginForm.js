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
        className='LoginForm flex-col center box-shadow-xl p-4 rounded justify width-60-per height-fit font-nav font-mono '
        onSubmit={this.handleSubmit}
      >
        <div role='alert' className=" flex-1">
          {error&&<p className="font-xxl text-red">{error}</p>}
        </div>
        <div className="flex-row justify flex-1">
          <Label htmlFor='loginputnbox'
            className=" flex-1">
            Username
          </Label>
          <Input className="flex-1 border-none font-xl"
            ref={this.firstInput}
            placeholder="username here"
            id='loginputnbox'
            name='username'
            required
          />
        </div>
        <div className="flex-1 justify flex-row">
          <Label htmlFor='loginputpbox'
            className="flex-1">
            Password
          </Label>
          <Input className="font-xl border-none flex-1"
            placeholder="password here"
            id='loginputpbox'
            name='password'
            type='password'
            required
          />
        </div>
        <Button type='submit'
          className="rounded hoverbutt border-none flex-1 transition center m-2 font-xxl font-mono ">
          Login
        </Button>
      </form>
    )
  }
}

export default LoginForm
