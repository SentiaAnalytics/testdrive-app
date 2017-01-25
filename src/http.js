//@flow
import type {Dict} from './model'
import axios from 'axios'
import Task from 'data.task'


export const post = (url:string, data:Dict) =>
  new Task((reject, resolve) =>
    axios.post(url, data, {withCredentials: true})
      .then(resolve, reject))
