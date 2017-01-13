//@flow
export type ActionType = 'NO_OP'
  | 'SET_TITLE'
  | 'SET_TITLE_ASYNC'

export type Action = {
  type: ActionType,
  payload:any
}

export const setTitle = (title:string):Action => ({
    type: 'SET_TITLE',
    payload: title
})
export const setTitleAsync = (title:string):Action => ({
    type: 'SET_TITLE_ASYNC',
    payload: title
})
