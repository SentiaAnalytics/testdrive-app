//@flow
import React from 'react'
import type {Dict} from '../../model'
import './padding.scss'
import {createClassName} from '../../util'

type Props = {
  children?: any[],
  style?: Dict,
  small?: bool,
  large?: bool,
}
const CLASS_PROPS = [
  'large',
  'small'
]
const className = createClassName('padding')(CLASS_PROPS)

export default (props:Props) =>
  <div className={className(props)} style={props.style}>
    {props.children}
  </div>
