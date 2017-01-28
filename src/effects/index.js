//@flow
import Task from 'data.task'
import type {Action} from '../model'
import {noop, showToast} from '../actions'
import cookie from 'cookie'

export * from './auth'
export * from './local-storage'
export * from './navigation';
export * from './testdrive';

export const toastError = (msg: string) =>
  Task.of(showToast({type:'error', msg}))

export const delay = (ms:number, action: Action) =>
  new Task((_, resolve) => setTimeout(() => resolve(action), ms || 0))

export const log = (key, value) => new Task((_, resolve) => (console.log(key, value), resolve(noop)))

export const setCookie = (key:string) => (value:string) =>
  new Task((_, resolve) => {
    document.cookie = cookie.serialize(key, value)
    resolve(noop)
  })
