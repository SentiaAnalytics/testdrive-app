//@flow
import type {Action, Model, Dict, ActionHandler} from '../model'
import {cmd} from '../start-app'
import {evolve} from '../util'
import forms from './forms'
import signature from './signature'
import testdrive from './testdrive'
import toasts from './toasts'
import auth from './auth'
import history from './history'
import * as task from '../tasks'

export default {
  ...forms,
  ...history,
  ...signature,
  ...testdrive,
  ...auth,
  ...toasts,

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
