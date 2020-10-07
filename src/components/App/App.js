import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Header from '../Header/Header'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute'
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
import LoginRoute from '../../routes/LoginRoute/LoginRoute'
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute'
import LearningRoute from '../../routes/LearningRoute/LearningRoute'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'
import './App.css'
export default class App extends Component {
  state={hasError: false}

  static getDerivedStateFromError(error) {
    console.error(error)
    return {hasError: true}
  }

  render() {
    const {hasError}=this.state
    return (
      <div className='App flex width-full height-full'>
        <Header />
        <main className="justify flex  pb-10">
          {hasError&&(
            <p className="font-xl text-red">There was an error! Oh no!</p>
          )}
          <Switch>
            <PrivateRoute
              exact
              path={'/'}
              component={DashboardRoute}
            />
            <PrivateRoute
              path={'/learn'}
              component={LearningRoute}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginRoute}
            />
            <Route
              component={NotFoundRoute}
            />
          </Switch>
        </main>

        <footer className="background-orange width-full flex-base mt-1 max-height-4 mt-10 pos-bottom ">
          <div className="flex-1 text-bold background-orange px-2 text-white center tracking-wide font-mono font-xl">
            Practice learning a language with the spaced reptition revision technique.
          </div>
        </footer>
      </div>
    );
  }
}
