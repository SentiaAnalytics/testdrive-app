//@flow
import React from 'react'
import type {Dict} from '../../model'

type Props = {
  children?: any[],
  style?:Dict
}

const defaultStyle = {
  backgroundColor: 'white',
  position: 'relative',
  transition: 'box-shadow .25s',
  borderRadius: 2,
  boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)'
}

export default ({children, style={}}:Props) =>
  <div style={{...defaultStyle, ...style}}>
    {children}
  </div>
