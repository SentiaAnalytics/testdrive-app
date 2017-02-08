//@flow

import React from 'react'
import {createClassName} from '../../util'
import './title.scss'

type Props = {
  white?:bool,
  primary?: bool,
  secondary?: bool,
  info?: bool,
  succes?: bool,
  warning?: bool,
  danger?: bool,
  children?:any[]
}

const classProps = [
  'white',
  'primary',
  'secondary',
  'info',
  'succes',
  'warning',
  'danger'
]
const className = createClassName('title')(classProps)

export default (props:Props) =>
  <h1 className={className(props)}>{props.children}</h1>
