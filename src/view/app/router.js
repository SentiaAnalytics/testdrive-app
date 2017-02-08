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
import Testdrive from '../testdrive'
import Login from '../login'
import Toast from '../toast'
import Driverslicense from '../driverslicense'
import Cpr from '../cpr'
import {Layout} from '../layout'
import './app.scss'
import Test from '../test'
import Route from '../route'

export default (msg:Msg, state:Model) => {
  const {
    cprForm,
    driverForm,
    licenseplateForm,
    consentForm,
    modals,
    user,
    testdriveRequest,
    testdriveList,
    testdriveStatus,
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

        <Route pattern="/testdrives/:testdriveId" location={location} render={() =>
          <Testdrive {...{testdriveList, location}} />
        }/>

        <Route pattern="/new/driverslicense" location={location} render={() =>
          <Driverslicense {...{msg, testdriveRequest} } />
        }/>

        <Route pattern="/new/cpr" location={location} render={() =>
          <Cpr {...{msg, cprForm} } />
        }/>

        <Route pattern="/new/driver" location={location} render={() =>
          <NewDriver {...{msg, driverForm} } />
        }/>

        <Route pattern="/new/brand" location={location} render={() =>
          <NewBrand {...{msg, brands}} />
        }/>

        <Route pattern="/new/model" location={location} render={() =>
          <NewModel {...{msg, models}} />
        }/>

        <Route pattern="/new/licenseplate" location={location} render={() =>
          <NewLicenseplate {...{msg, licenseplateForm, licenseplates}} />
        }/>

        <Route pattern="/new/confirm" location={location} render={() =>
          <Confirm {...{msg, consentForm, testdriveStatus, signatureModal: modals.signature}} />
        }/>
      </div>
    </div>

  )
}
