//@flow
import {noop} from './actions'
import Task from 'data.task'
import history from './history.js'

export const historyPush = (url:string) =>
  new Task((reject, resolve) => {
    history.push(url)
    setTimeout(() => resolve(noop), 0)
  })

export const historyReplace = (url:string) =>
  new Task((reject, resolve) => {
    history.replace(url)
    setTimeout(() => resolve(noop), 0)
  })

export const removeLocalStorage = (key:string) =>
  new Task((reject, resolve) => {
    localStorage.removeItem(key)
    setTimeout(_ => resolve(noop), 0)
  })

export const setLocalStorage = (key:string) => (data:any) =>
  new Task((reject, resolve) => {
    localStorage.setItem(key, JSON.stringify(data))
    setTimeout(_ => resolve(noop), 0)
  })
