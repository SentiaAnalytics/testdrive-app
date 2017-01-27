//@flow
import React from 'react'
import {Link} from 'react-router'
import type {Driver, Dispatch} from '../model'
import {compose, targetValue, preventDefault} from '../util'
import {setFormField, submitDriverForm} from '../actions'
import TextInput from './text-input'
import {Layout, Col, Padding} from './layout'
import Button from './button'

type Props = {
  driverForm: Driver,
  dispatch: Dispatch
}

export default ({dispatch, driverForm}:Props) => {
  const setField = field =>
    compose(dispatch, setFormField('driverForm')(field), targetValue)

  return (
    <form
      onSubmit={compose(dispatch, _ => submitDriverForm(driverForm), preventDefault)}
      >
      <Layout column>
        <Col grow={1} shrink={1} style={{background: 'white'}}>
          <Padding>
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
          </Padding>
        </Col>

        <Col>
          <Button type="submit" block primary large>Next</Button>
        </Col>
      </Layout>
    </form>
  )
}
