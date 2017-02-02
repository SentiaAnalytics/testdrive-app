//@flow
import {historyPush, historyReplace, historyPop} from '../effects'
import {cmd} from '../start-app'
import type {Model, ActionHandler, Dict} from '../model'


const handler:ActionHandler =  {
  HISTORY_PUSH: (state:Model, location:Dict) =>
    cmd({...state, location}, historyPush(state.user.status === 'SUCCESS' ? location : '/login')),
  HISTORY_POP: (state:Model,location:Dict) =>
    state.user ? ({...state, location}) : cmd({...state, location}, historyReplace('/login')),

  HISTORY_REPLACE: (state:Model, location:Dict) => cmd({...state, location}, historyReplace(state.user.status === 'SUCCESS' ? location : '/login')),
}

export default handler
