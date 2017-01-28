//@flow

import type {Model, ActionHandler} from '../model'
import {cmd} from '../start-app'
import * as eff from '../effects'

const handler:ActionHandler = {
  LOGIN : (state, credentials) =>
    cmd(state, eff.authenticate(credentials)),
  LOGIN_SUCCESS: (state, {user, token}) =>
    cmd({...state, user},
      eff.setCookie('jwt')(token),
      eff.historyPush('/')
    ),
  LOGIN_FAIL: (state, error) =>
    cmd(state, eff.toastError(error)),
}

export default handler
