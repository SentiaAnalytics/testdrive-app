//@flow
import React from 'react'
import history from '../../history'
import type {Dispatch, Model} from '../../model'
import {compose} from '../../util'
import {Redirect, StaticRouter, Match} from 'react-router'
import {historyPush, historyReplace} from '../../actions'
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

export default (dispatch:Dispatch, state:Model) => {
  const {driverForm, carForm,
    concentForm, modals, user,
    testdriveList, loginForm, toast, brands, models} = state
  return (
    <StaticRouter
      action={history.action}
      location={location}
      onPush={ x => dispatch(historyPush(x))}
      onReplace={ x => dispatch(historyReplace(x))}
      blockTransitions={history.block}
      >
      <div className="app">
        <Toast {...{dispatch, toast}} />
        <Match exactly pattern="/" render={params =>
          <Home {...{dispatch, testdriveList} } />
        }/>
        <Match exactly pattern="/login" render={params =>
          <Login {...{dispatch, loginForm} } />
        }/>
        <Match exactly pattern="/new/driver" render={params =>
          <NewDriver {...{dispatch, driverForm} } />
        }/>
        <Match exactly pattern="/new/brand" render={params =>
          <NewBrand {...{dispatch, carForm, brands}} />
        }/>
        <Match exactly pattern="/new/model" render={params =>
          <NewModel {...{dispatch, carForm, models}} />
        }/>
        <Match exactly pattern="/new/licenseplate" render={params =>
          <NewLicenseplate {...{dispatch, carForm}} />
        }/>
        <Match exactly pattern="/new/confirm" render={params =>
          <Confirm {...{dispatch, concentForm, signatureModal: modals.signature}} />
        }/>
      </div>
    </StaticRouter>
  )
}
