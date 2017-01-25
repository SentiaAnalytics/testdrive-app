//@flow
import type {Action, Model, Dict, ActionHandler} from '../model'
import {cmd} from '../start-app'
import {evolve} from '../util'
import {delay} from '../effects'
import {hideToast} from '../actions'
import forms from './forms'
import signature from './signature'
import testdrive from './testdrive'
import navigation from './navigation'
import auth from './auth'

const handler:ActionHandler = {
  ...forms,
  ...navigation,
  ...signature,
  ...testdrive,
  ...auth,

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
