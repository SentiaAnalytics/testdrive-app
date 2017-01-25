//@flow
import Task from 'data.task'
import history from '../history'
import {noop} from '../actions'

export const historyPush = (url:string) =>
  new Task((reject, resolve) => {
    history.push(url)
    resolve(noop)
  })

export const historyReplace = (url:string) =>
  new Task((reject, resolve) => {
    history.replace(url)
    resolve(noop)
  })

export const historyPop = new Task((reject, resolve) => {
  history.pop()
  resolve(noop)
})
