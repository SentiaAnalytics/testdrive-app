//@flow
import type {Action, Model, Dict, ActionHandler} from '../model'
import {evolve, assocPath} from '../util'
import forms from './forms'
import signature from './signature'
import testdrives from './testdrives'
import newTestdrive from './new-testdrive'
import toasts from './toasts'
import auth from './auth'
import cpr from './cpr'
import history from './history'
import * as task from '../tasks'

export default {
  ...forms,
  ...history,
  ...signature,
  ...testdrives,
  ...newTestdrive,
  ...auth,
  ...toasts,
  ...cpr,

  search: (state, name, value, msg) =>
    [assocPath(['search', name])(value)(state)],

  init : (state, msg) =>
    [state, task.validateSession.fold(msg.validateSessionFail, msg.validateSessionSuccess)],

  openModal: (state:Model, modal:Dict) =>
    [evolve({modals: {[modal]: () => true}})(state)],

  httpError: (state:Model, err:any, msg) => {
    if (err.response.status === 401) {
      return [
        state,
        task.historyReplace('/login')
      ]
    }
    return [
      state,
      task.call(msg.toastDanger, err.response.body)
    ]
  }

}
