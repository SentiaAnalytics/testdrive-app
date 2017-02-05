//@flow
import React from 'react'
import history from '../../history'
import type {Msg, Model} from '../../model'
import {compose} from '../../util'
import {Redirect, StaticRouter, Match} from 'react-router'
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
    <StaticRouter
      action={history.action}
      location={location}
      onPush={msg.historyPush}
      onReplace={ msg.historyReplace}
      blockTransitions={history.block}
      >
      <div className="app">
        <div className="app-inner">
          <Toast {...{msg, toast}} />
          <Match exactly pattern="/" render={params =>
            <Home {...{msg, testdriveList} } />
          }/>
          <Match exactly pattern="/login" render={params =>
            <Login {...{msg, loginForm, user} } />
          }/>
          <Match exactly pattern="/test" render={params =>
            <Test />
          }/>
          <Match exactly pattern="/new/driver" render={params =>
            <NewDriver {...{msg, driverForm, driver: testdrive.driver} } />
          }/>
          <Match exactly pattern="/new/brand" render={params =>
            <NewBrand {...{msg, carForm, brands}} />
          }/>
          <Match exactly pattern="/new/model" render={params =>
            <NewModel {...{msg, carForm, models}} />
          }/>
          <Match exactly pattern="/new/licenseplate" render={params =>
            <NewLicenseplate {...{msg, carForm, licenseplates}} />
          }/>
          <Match exactly pattern="/new/confirm" render={params =>
            <Confirm {...{msg, consentForm, signatureModal: modals.signature}} />
          }/>
        </div>
      </div>
    </StaticRouter>
  )
}
