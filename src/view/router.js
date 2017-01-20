//@flow
import React from 'react'
import history from '../history'
import type {Dispatch, Model} from '../model'
import {compose} from '../util'
import {Redirect, StaticRouter, Match} from 'react-router'
import {historyPush, historyReplace} from '../actions'
import Car from './car'
import Driver from './driver'
import Confirm from './confirm'

export default (dispatch:Dispatch, state:Model) => {
  const {driverForm, carForm} = state
  return (
    <StaticRouter
      action={history.action}
      location={location}
      onPush={ x => dispatch(historyPush(x))}
      onReplace={ x => dispatch(historyReplace(x))}
      blockTransitions={history.block}
      >
      <div className="full-height">
        <Match exactly pattern="/driver" render={params =>
          <Driver {...{dispatch, driverForm} } />
        }/>
        <Match exactly pattern="/car" render={params =>
          <Car {...{dispatch, carForm}} />
        }/>
        <Match exactly pattern="/confirm" render={params =>
          <Confirm {...{dispatch}} />
        }/>
        <Match exactly pattern="/" render={params =>
          <Redirect to="/driver"/>
        }/>
      </div>

    </StaticRouter>
  )
}
