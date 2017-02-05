//@flow
import {cmd} from '../start-app'
import type {Model, ActionHandler, Dict} from '../model'
import * as task from '../tasks'
import history from '../history'
import Task from 'data.task'


const handler:ActionHandler =  {
  historyPush: (state:Model, loc, msg) => {
    const location = state.user.status === 'SUCCESS' ? loc : '/login'
    return [
      {...state, location},
      location === history.locaton ? Task.of() : task.historyPush(location)
    ]
  },
  historyPop: (state:Model,location:Dict) =>
    state.user ? [{...state, location}] : [{...state, location}, task.historyReplace('/login')],

  historyReplace: (state:Model, loc) => {
    const location = state.user.status === 'SUCCESS' ? loc : '/login'
    return [
      {...state, location},
      location === history.location ? Task.of() : task.historyPush(location)
    ]
  }
}

export default handler
