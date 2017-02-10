//@flow
import React from 'react'
import {createClassName, toPairs} from '../../util'
import type {Dict} from '../../model';
import './layout.scss'

type Props = {
  children?: any[],
  style?: Dict,
  row? :boolean,
  column? :boolean,
  top?:bool,
  middle?:bool,
  bottom?:bool,
  left?:bool,
  center?: bool,
  "space-around"?:bool,
  "space-between"?:bool,
  right?: bool,
  primary?: bool,
  scroll?: bool
}
const CLASS_PROPS = [
  'grow',
  'shrink',
  'row',
  'column',
  'top',
  'middle',
  'bottom',
  'left',
  'center',
  'space-around',
  'space-between',
  'right',
  'primary',
  'scroll'
]
const className = createClassName('layout')(CLASS_PROPS)

export default (props:Props) =>
  <div className={className(props)} style={props.style}>
    {props.children}
  </div>
