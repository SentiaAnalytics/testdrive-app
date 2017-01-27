//@flow
import React from 'react'
import './modal.scss'

type Props = {
  isVisible: bool,
  children?: any[]
}

export default ({isVisible, children }:Props) =>
  <div className={`modal ${isVisible ? 'modal-show' : ''}`}>
    <div className="modal-dialog" role="document">
      {children}
    </div>
  </div>
