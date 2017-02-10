//@flow
import Task from 'data.task'
import history from '../history'

export const historyPush = (url:string) =>
  new Task((reject, resolve) => {
    history.push(url)
    resolve(history.location)
  })

export const historyReplace = (url:string) =>
  new Task((reject, resolve) => {
    history.replace(url)
    resolve(history.location)
  })

export const historyPop = new Task((reject, resolve) => {
  history.goBack()
  resolve(history.location)
})
