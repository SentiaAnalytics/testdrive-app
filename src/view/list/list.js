//@flow
import React from 'react'
import type {Dict} from '../../model'
import './list.scss'

type Props = {
  children?: any[],
  style?:Dict
}

const defaultStyle = {
}

export default ({children, style={}}:Props) =>
  <ul className="list" style={{...defaultStyle, ...style}}>
    {children}
  </ul>
