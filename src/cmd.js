//@flow
type Task = {
  map: Function,
  chain: Function,
  fork: Function
}

export const cmd =  (state:any, task:Task) => ({__cmd__: true, state, task})
export const cmdHandler = (dispatch:Function, reducer:Function) =>
    (state:any , action:any) => {
      const next = reducer(state, action)
      if (next.__cmd__) {
          next.task.fork(dispatch, dispatch)
        return next.state
      }
      return next
    }
