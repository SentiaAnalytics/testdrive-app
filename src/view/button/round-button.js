//@flow
import React from 'react'
import './round-button.scss'
import {createClassName} from '../../util'

type Props = {
  children?: any[],
  type?: string,
  onClick?: Function,
  white?: bool,
  primary?: bool,
  bottom?: bool,
  right?: bool,
  outline?: bool,
  lg?: bool,
  xl?: bool
}

const CLASS_PROPS = [
  'white',
  'primary',
  'bottom',
  'outline',
  'right',
  'primary',
  'lg',
  'xl'
]
const className = createClassName('round-button')(CLASS_PROPS)

export default (props:Props) =>
  <button
    type={props.type || 'button'}
    className={className(props)}
    onClick={props.onClick || (x => x)}
  >
    {props.children}
  </button>
