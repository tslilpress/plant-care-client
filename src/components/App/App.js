import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import PlantIndex from '../PlantIndex/PlantIndex'
import CreatePlant from '../CreatePlant/CreatePlant'
import PlantShow from '../PlantShow/PlantShow'
import PlantUpdate from '../PlantUpdate/PlantUpdate'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <div className='home'>
              <h1 className='title'>Plant Care</h1>
              <h5>Never Kill a Plant Again!</h5>
            </div>
          )}
          />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/my-plants' render={() => (
            <PlantIndex user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/add-plant' render={() => (
            <CreatePlant msgAlert={this.msgAlert} user={user} />
          )} />
          <Route user={user} exact path='/plants/:id' render={() => (
            <PlantShow msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/plants/:id/edit-plant' render={() => (
            <PlantUpdate user={user} msgAlert={this.msgAlert} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
