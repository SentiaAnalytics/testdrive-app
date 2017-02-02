//@flow
import React from 'react'
import type {Dict} from '../../model'
import './scss/font-awesome.scss'
import {createClassName} from '../../util'

type Props = {
  type: string,
  primary?:bool,
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
  'primary',
  'secondary',
  'tertiary',
  'success',
  'info',
  'warning',
  'danger',
  'type',
  'lg',
  'xl'
]
const className = createClassName('icon')(CLASS_PROPS)

export default (props:Props) =>
  <i className={className(props)}/>
