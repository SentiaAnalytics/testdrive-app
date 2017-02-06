//@flow
import type {Dict} from './model'
import axios from 'axios'
import Task from 'data.task'
import {getCookie} from './util'

const log = key => value => (console.log(key, value), value)

const getHeaders = () => {
  const jwt = getCookie('jwt').getOrElse('')
  return {
    'Authorization': jwt
  }
}

export const post = (url:string) => (data:Dict) =>
  new Task((reject, resolve) =>
    axios.post(url, data, {withCredentials: true, headers: getHeaders()})
      .then(r => resolve(r.data), e => reject(e))
  )

export const put = (url:string) => (data:Dict) =>
  new Task((reject, resolve) =>
    axios.put(url, data, {withCredentials: true, headers:getHeaders()})
      .then(r => resolve(r.data), reject)
  )

export const get = (url:string) =>
  new Task((reject, resolve) => {
    console.log('get', url)
    axios.get(url, {withCredentials: true, headers:getHeaders()})
      .then(r => resolve(r.data), reject)
    }
  )
