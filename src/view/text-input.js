//@flow
import React from 'react'
type Props = {
  value: string,
  onChange: Function,
  label:string,
  type?: string
}

export default ({value, onChange, label, type='text'}:Props) =>
  <div className="form-group">
    <label className="block">
      {label}
      <input type={type} className="form-control" value={value} onChange={onChange} required/>
    </label>
  </div>
