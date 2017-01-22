//@flow
import {noop} from './actions'
import type {Testdrive} from './model'
import Task from 'data.task'
import history from './history.js'
import {map} from './util'
import {confirmTestdriveSuccess, confirmTestdriveFail} from './actions'
import uuid from 'uuid/v4'
import * as api from './api'

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

export const submitTestdrive = (testdrive:Testdrive) =>
  api.submitTestdrive(testdrive)
    .fold(confirmTestdriveFail, () => confirmTestdriveSuccess({...testdrive, id: uuid()}))
