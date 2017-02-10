//@flow
import React from 'react'
import type {Dict} from '../../model'
import {createClassName} from '../../util'
import './col.scss'

type Props = {
  grow?: number | string,
  shrink?: number | string,
  children?: any[],
  top?: bool,
  bottom?: bool,
  middle?: bool,
  style?: Dict
}

const CLASS_PROPS = [
  'grow',
  'shrink',
  'top',
  'middle',
  'bottom',
  'white',
  'primary',
  'info',
  'success',
  'warning',
  'danger'
]
const className = createClassName('col')(CLASS_PROPS)

export default (props:Props) => {
  const {children, style = {}} = props

  return (
    <div className={className(props)} style={style}>
      {children}
    </div>
  )
}
