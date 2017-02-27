//@flow
import React from 'react'
import './round-button.scss'
import {createClassName} from '../../util'
import Link from '../link'

type Props = {
  children?: any[],
  to?: string,
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
  props.to ?
    <Link
      className={className(props)}
      onClick={props.onClick || (x => x)}
      to={props.to || '#'}
    >
      {props.children}
    </Link>
    :
    <button
      type={props.type || 'button'}
      className={className(props)}
      onClick={props.onClick || (x => x)}
    >
      {props.children}
    </button>
