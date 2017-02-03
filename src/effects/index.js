//@flow
import Task from 'data.task'
import type {Action} from '../model'
import {noop, showToast} from '../actions'
import cookie from 'cookie'

export * from './auth'
export * from './local-storage'
export * from './navigation';
export * from './testdrive';

export const toastInfo = (msg: string) =>
  Task.of(showToast({type:'info', msg}))

export const toastSuccess = (msg: string) =>
  Task.of(showToast({type:'success', msg}))

export const toastWarning = (msg: string) =>
  Task.of(showToast({type:'warning', msg}))

export const toastDanger = (msg: string) =>
  Task.of(showToast({type:'danger', msg}))

export const delay = (ms:number, action: Action) =>
  new Task((_, resolve) => setTimeout(() => resolve(action), ms || 0))

export const log = (key, value) => new Task((_, resolve) => (console.log(key, value), resolve(noop)))

export const setCookie = (key:string) => (value:string) =>
  new Task((_, resolve) => {
    document.cookie = cookie.serialize(key, value)
    resolve(noop)
  })
