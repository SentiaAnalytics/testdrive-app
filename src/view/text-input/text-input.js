//@flow
import React from 'react'
import type {Dict} from '../../model'
import './text-input.scss'

type Props = {
  focusOnLoad?: bool,
  value: string,
  onChange: Function,
  white?: bool,
  required?:bool,
  label:string,
  type?: string,
  style?: Dict
}

export default class TextInput extends React.Component {
  componentDidMount() {
    if (this.props.focusOnLoad) {
      this.refs.input.focus()
    }
  }

  render () {
    const {value, white, onChange, label, type='text', style= {}, required} = this.props
    return (
      <div className="text-input">
        <label>
          {label}
          <input
            ref="input"
            className={white ? 'text-input-white' : ''}
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
