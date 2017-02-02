//@flow
import React from 'react'
import './loader.scss'
type Props = {
  message?: string,
  show: bool
}
export default ({message = '', show}:Props) =>
  show ?
    <div className="loader">
      <div className="loader-spinner"></div>
      <h4 className="loader-message">{message}</h4>
    </div>
  : null
