//@flow
import React from 'react'
import type {Toast} from '../../model'
import './toast.scss'

type Props = {
  toast: ?Toast,
}

export default ({toast}:Props) => {
  if (!toast) return null
  return (
      <div className={`toast toast-${toast.type}`}>
        {toast.msg}
      </div>
    )
}
