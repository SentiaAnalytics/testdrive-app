//@flow

import type {Model, ActionHandler} from '../model'
import {cmd} from '../start-app'
import {assocPath} from '../util'
import * as eff from '../effects'

const handler:ActionHandler = {
  LOGIN : (state, credentials) =>
    cmd(
      assocPath(['user', 'status'])('PENDING')(state),
      eff.authenticate(credentials)
    ),
  LOGIN_SUCCESS: (state, {user, token}) =>
    cmd({...state, user: {status:'SUCCESS', value: user}},
      eff.setCookie('jwt')(token),
      eff.historyPush('/')
    ),
  LOGIN_FAIL: (state, err) =>
    cmd(assocPath(['user', 'status'])('FAIL')(state), eff.toastDanger(err.response.data)),
}

export default handler
