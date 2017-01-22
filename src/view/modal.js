//@flow
import React from 'react'
type Props = {
  isVisible: bool,
  children: any[]
}

export default ({isVisible, children }:Props) =>
  <div className={`modal ${isVisible ? 'modal-open' : ''}`}>
    <div className="modal-dialog" role="document">
      {children}
    </div>
  </div>
