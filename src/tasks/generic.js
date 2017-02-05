//@flow
import Task from 'data.task'
import cookie from 'cookie'
import {append} from '../util'

export const delay = (f:Function) => (ms:number) =>
  new Task((_, resolve) =>
    setTimeout(() => resolve(f()), ms)
  )

export const call = (f:Function, ...args: any[]) =>
  delay(() => f(...args))(0)

export const all = (tasks:any[]) =>
  tasks.reduce((acc, t) => t.map(append).ap(acc), Task.of([]))


export const setCookie = (key:string) => (value:string) =>
  new Task((_, resolve) => {
    document.cookie = cookie.serialize(key, value)
    resolve()
  })
