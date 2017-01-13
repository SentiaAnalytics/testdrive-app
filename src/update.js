//@flow
import Task from 'data.task'
import {setTitle} from './actions'
import {cmd} from './cmd'
import type {Model} from './Model'
import type {Action} from './actions'

const setTitleAsync = title => new Task((reject, resolve) =>
  setTimeout(() => resolve(setTitle(title)), 2000))


export default (state: Model, action:Action) => {
  switch(action.type) {
    case 'SET_TITLE':
      return {...state, title: action.payload}
    case 'SET_TITLE_ASYNC':
      return cmd({...state, title: 'loading...'}, setTitleAsync(action.payload))
    default:
        return state
  }
}
