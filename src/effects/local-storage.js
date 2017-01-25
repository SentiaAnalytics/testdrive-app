//@flow
import Task from 'data.task'
import {noop} from '../actions'

export const removeLocalStorage = (key:string) =>
  new Task((_, resolve) => {
    localStorage.removeItem(key)
    resolve(noop)
  })

export const setLocalStorage = (key:string) => (data:any) =>
  new Task((_, resolve) => {
    localStorage.setItem(key, JSON.stringify(data))
    resolve(noop)
  })
