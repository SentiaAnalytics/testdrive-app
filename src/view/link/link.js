//@flow
import history from '../../history'
import {compose, preventDefault, createClassName} from '../../util'
import React from 'react'
import './link.scss'

type Props = {
  children?:any[],
  onClick?: Function,
  className?: string,
  to:string,
  white?: bool
}
const CLASS_PROPS = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'info',
  'white',
  'warning',
  'danger',
  'disabled'
]
const className = createClassName('link')(CLASS_PROPS)
export default (props:Props) =>
  <a className={props.className || className(props)} href={props.to} onClick={ props.onClick || compose(() => history.push(props.to), preventDefault)}>
    {props.children}
  </a>
