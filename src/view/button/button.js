//@flow

import React from 'react'
import type {Dict} from '../../model'
import {Link} from 'react-router'
import './button.scss'
import {createClassName} from '../../util'

type Props = {
  children?: any[],
  style?: Dict,
  primary?: bool,
  secondary?: bool,
  tertiary?: bool,
  success?: bool,
  info?: bool,
  block?: bool,
  warning?: bool,
  danger?: bool,
  disabled?: bool,
  large?: bool,
  link?: bool,
  onClick?:Function,
  type?: string,
  href?: string,
  disable?: bool
}

const CLASS_PROPS = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'info',
  'block',
  'warning',
  'danger',
  'large',
  'link',
  'disabled'
]
const className = createClassName('button')(CLASS_PROPS)

export default (props:Props) => {
  const {style = {}, children, onClick= x => x, type = 'button', href, disabled} = props
  const buttonProps = { style, type, onClick, className: className(props), disabled }

  if (href) {
    return <Link {...{...buttonProps, to:href}}>{children}</Link>
  }
  return <button disabled={disabled} {...buttonProps}>{children}</button>
}
