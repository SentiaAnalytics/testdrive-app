//@flow
import React from 'react'
import type {Dispatch, Toast} from '../model'

type Props = {
  dispatch: Dispatch,
  toast: ?Toast
}

export default ({dispatch, toast}:Props) => {
  if (!toast) return null
  return (
      <div className={`toast toast-${toast.type}`}>
        {toast.msg}
      </div>
    )
}
