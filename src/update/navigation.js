//@flow
import {cmd} from '../start-app'
import type {Model, ActionHandler, Dict} from '../model'
import * as task from '../tasks'
import {} from '../util'
import Either from 'data.either'

const router = historyOperation => (state, location, msg) => {
    if( location !== '/login' && state.user.status !== 'SUCCESS') {
      return [state, task.call(msg.historyReplace, '/login')]
    }
    if (location === state.location) return [ state ]
    switch(location) {
      case "/":
        return [{
            ...state,
            location,
            testdriveList: { status: 'PENDING'}
          },
          task.all([
            task.getTestdriveList,
            historyOperation(location)
          ])
        ]
      default :
        return [ state, historyOperation(location)]
    }
}

const handler:ActionHandler =  {
  historyPush: router(task.historyPush),
  historyPop: (state:Model,location:Dict) =>
    state.user ? [{...state, location}] : [{...state, location}, task.historyReplace('/login')],
  historyReplace: router(task.historyReplace)

}

export default handler
