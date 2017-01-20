//@flow
type Task = {
  map: Function,
  chain: Function,
  fork: Function
}

export const cmd =  (state:any, ...tasks:Task[]) => ({__cmd__: true, state, tasks})
export const cmdHandler = (dispatch:Function, reducer:Function) =>
    (state:any , action:any) => {
      const next = reducer(state, action)
      if (next && next.__cmd__) {
        next.tasks.forEach(t => t.fork(dispatch, dispatch))
        return next.state
      }
      return next
    }
