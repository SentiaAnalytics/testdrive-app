//@flow
import React from 'react'
import type {Dict} from '../../model'
import './icon.scss'
import {createClassName} from '../../util'

type Props = {
  type: string,
  white?: bool,
  primary?: bool,
  secondary?: bool,
  success?: bool,
  info?: bool,
  warning?: bool,
  danger?: bool,
  style?: Dict,
  lg?: bool,
  xl?: bool
}

const CLASS_PROPS = [
  'white',
  'primary',
  'secondary',
  'tertiary',
  'success',
  'info',
  'warning',
  'danger',
  'lg',
  'xl'
]
const className = createClassName('material-icons')(CLASS_PROPS)

export default (props:Props) =>
  <i className={className(props)}>{props.type}</i>
