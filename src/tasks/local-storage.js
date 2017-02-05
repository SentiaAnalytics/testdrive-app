//@flow
import Task from 'data.task'

export const removeLocalStorage = (key:string) =>
  new Task((_, resolve) => {
    localStorage.removeItem(key)
    resolve()
  })

export const setLocalStorage = (key:string) => (data:any) =>
  new Task((_, resolve) => {
    localStorage.setItem(key, JSON.stringify(data))
    resolve()
  })
