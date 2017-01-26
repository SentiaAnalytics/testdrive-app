//@flow
import React from 'react'
import type {Dict} from '../../model'
import './padding.scss'

type Props = {
  children?: any[],
  style?: Dict
}

export default ({style = {}, children}:Props) =>
  <div className="padding" style={style}>
    {children}
  </div>
