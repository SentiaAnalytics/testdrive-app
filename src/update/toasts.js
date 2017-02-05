//@flow

import Task from 'data.task'
import type {Model, Dict} from '../model'

const delay = f => (ms:number) =>
  new Task((_, resolve) =>
    setTimeout(() => resolve(f()), ms)
  )

const showToast = type => (state:Model, content:string, msg:Dict) =>
  [
    {...state, toast: {type, msg: content}},
    delay(msg.hideToast)(3000)
  ]

export default {
  toastInfo: showToast('info'),
  toastSuccess: showToast('success'),
  toastWarning: showToast('warning'),
  toastDanger: showToast('danger'),
  hideToast: (state:Model) =>
    [{...state, toast:null}]

}
