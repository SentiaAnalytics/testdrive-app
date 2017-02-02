//@flow
import React from 'react'
import type {Dict} from '../../model'
import './text-input.scss'

type Props = {
  focusOnLoad?: bool,
  value: string,
  onChange: Function,
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
    const {value, onChange, label, type='text', style= {}} = this.props
    return (
      <div className="text-input">
        <label>
          {label}
          <input
            ref="input"
            type={type}
            value={value}
            onChange={onChange}
            style={style}
            required/>
        </label>
      </div>
    )
  }
}
