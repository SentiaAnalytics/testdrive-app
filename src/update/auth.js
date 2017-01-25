//@flow

import type {Model, ActionHandler} from '../model'
import {cmd} from '../start-app'
import {authenticate, toastError, historyPush} from '../effects'

const handler:ActionHandler = {
  LOGIN : (state, credentials) => cmd(state, authenticate(credentials)),
  LOGIN_SUCCESS: (state, user) => cmd({...state, user}, historyPush('/')),
  LOGIN_FAIL: (state, error) => cmd(state, toastError(error)),
}

export default handler
