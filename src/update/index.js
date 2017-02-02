//@flow
import type {Action, Model, Dict, ActionHandler} from '../model'
import {cmd} from '../start-app'
import {evolve} from '../util'
import {delay, validateSession, historyReplace} from '../effects'
import {hideToast} from '../actions'
import forms from './forms'
import signature from './signature'
import testdrive from './testdrive'
import navigation from './navigation'
import auth from './auth'
import history from '../history'
import Task from 'data.task'

const handler:ActionHandler = {
  ...forms,
  ...navigation,
  ...signature,
  ...testdrive,
  ...auth,
  "@@INIT" : (state) =>
    cmd(state, validateSession),

  VALIDATE_SESSION_SUCCES: (state, user) =>
    cmd({...state, user: {status:'SUCCESS', value:user}}, Task.of(historyReplace(history.location))),

  VALIDATE_SESSION_FAIL: (state, user) =>
    cmd({...state, user: {status:'FAIL'}}, historyReplace('/login')),

  OPEN_MODAL: (state:Model, modal:Dict) => evolve({modals: {[modal]: () => true}})(state),

  SHOW_TOAST: (state:Model, toast:string) =>
    cmd({...state, toast}, delay(3000, hideToast)),
  HIDE_TOAST: (state:Model) =>
    ({...state, toast:null})

}

export default (state: Model, action:Action) => {
  if (handler[action.type]) {
    return handler[action.type](state, action.payload)
  }
  return state
}
