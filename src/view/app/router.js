//@flow
import React from 'react'
import history from '../../history'
import type {Msg, Model} from '../../model'
import {compose} from '../../util'
import NewDriver from '../driver'
import Confirm from '../confirm'
import Home from '../home'
import NewBrand from '../brand'
import NewModel from '../model'
import NewLicenseplate from '../licenseplate'
import Login from '../login'
import Toast from '../toast'
import {Layout} from '../layout'
import './app.scss'
import Test from '../test'
import Route from '../route'

export default (msg:Msg, state:Model) => {
  const {
    driverForm,
    carForm,
    consentForm,
    modals,
    user,
    testdrive,
    testdriveList,
    loginForm,
    toast,
    brands,
    models,
    location,
    licenseplates
  } = state
  return (
    <div className="app">
      <div className="app-inner">
        <Toast {...{msg, toast}} />
        <Route pattern="/" location={location} render={() =>
          <Home {...{msg, testdriveList} } />
        }/>
        <Route pattern="/login" location={location} render={() =>
          <Login {...{msg, loginForm, user} } />
        }/>
        <Route pattern="/test" location={location} render={() =>
          <Test />
        }/>
        <Route pattern="/new/driver" location={location} render={() =>
          <NewDriver {...{msg, driverForm, driver: testdrive.driver} } />
        }/>
        <Route pattern="/new/brand" location={location} render={() =>
          <NewBrand {...{msg, carForm, brands}} />
        }/>
        <Route pattern="/new/model" location={location} render={() =>
          <NewModel {...{msg, carForm, models}} />
        }/>
        <Route pattern="/new/licenseplate" location={location} render={() =>
          <NewLicenseplate {...{msg, carForm, licenseplates}} />
        }/>
        <Route pattern="/new/confirm" location={location} render={() =>
          <Confirm {...{msg, consentForm, signatureModal: modals.signature}} />
        }/>
      </div>
    </div>

  )
}
