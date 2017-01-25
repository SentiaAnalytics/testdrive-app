//@flow
import React from 'react'
import {Link} from 'react-router'
import type {Driver, Dispatch} from '../model'
import {compose, targetValue, preventDefault} from '../util'
import {setFormField, submitDriverForm} from '../actions'
import TextInput from './text-input'

type Props = {
  driverForm: Driver,
  dispatch: Dispatch
}

export default ({dispatch, driverForm}:Props) => {
  const setField = field =>
    compose(dispatch, setFormField('driverForm')(field), targetValue)

  return (
    <form
      className="flex-column"
      onSubmit={compose(dispatch, _ => submitDriverForm(driverForm), preventDefault)}
      >
      <div className="flex-grow-1 padding-base scroll-y">
        <h1>New Driver</h1>
        <TextInput
          label="CPR nummer"
          value={driverForm.cpr}
          onChange={setField('cpr')} />
        <TextInput
          label="Firstname"
          value={driverForm.firstname}
          onChange={setField('firstname')} />
        <TextInput
          label="Lastname"
          value={driverForm.lastname}
          onChange={setField('lastname')} />
        <TextInput
          type="email"
          label="email"
          value={driverForm.email}
          onChange={setField('email')} />
        <TextInput
          label="phone"
          value={driverForm.phone}
          onChange={setField('phone')} />
      </div>

      <div className="flex-grow-0">
        <input
          type="submit"
          className="btn btn-block btn-lg btn-primary" value="Next"/>
      </div>
    </form>
  )
}
