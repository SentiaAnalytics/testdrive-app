//@flow
import React from 'react'
import type {Dict} from '../../model'
import './text-input.scss'
import {createClassName} from '../../util'

type Props = {
  focusOnLoad?: bool,
  value: string,
  onChange: Function,
  required?:bool,
  label:string,
  type?: string,
  style?: Dict,
  lg?: bool,
  white?: bool
}

const CLASS_PROPS = [
  'lg',
  'white'
]

const className = createClassName('text-input')(CLASS_PROPS)

export default class TextInput extends React.Component {
  componentDidMount() {
    if (this.props.focusOnLoad) {
      this.refs.input.focus()
    }
  }

  render () {
    const {value, white, onChange, label, type='text', style= {}, required} = this.props
    return (
      <div className={className(this.props)}>
        <label>
          {label}
          <input
            ref="input"
            type={type}
            value={value}
            onChange={onChange}
            style={style}
            required={required}/>
        </label>
      </div>
    )
  }
}
