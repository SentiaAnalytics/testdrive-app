//@flow
import React from 'react'
import type {Dict} from '../../model'
import './text-input.scss'

type Props = {
  value: string,
  onChange: Function,
  label:string,
  type?: string,
  style?: Dict
}

export default ({value, onChange, label, type='text', style= {}}:Props) =>
  <div className="text-input">
    <label>
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={style}
        required/>
    </label>
  </div>
