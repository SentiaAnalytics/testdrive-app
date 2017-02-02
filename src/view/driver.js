//@flow
import React from 'react'
import {Link} from 'react-router'
import type {Driver, Dispatch} from '../model'
import {compose, targetValue, targetFiles,preventDefault, toPairs, any} from '../util'
import {setFormField, submitDriverForm, driversLicenseCaptured} from '../actions'
import TextInput from './text-input'
import {Layout, Col, Padding} from './layout'
import Button from './button'
import Camera from './camera'
import Loader from './loader'

type Props = {
  driverForm: Driver,
  driver: Driver,
  dispatch: Dispatch
}

export default ({dispatch, driverForm, driver}:Props) => {
  const setField = field =>
    compose(dispatch, setFormField('driverForm')(field), targetValue)

  return (
    <form
      onSubmit={compose(dispatch, _ => submitDriverForm(driverForm), preventDefault)}
      >
      <Loader message="Saving Drivers License" show={driver.licenseURL.status === 'PENDING'}/>
      <Layout column>
        <Col grow={1} shrink={1} style={{background: 'white'}}>
          <Padding>
            <h1>New Driver</h1>
            <Camera
              openOnLoad={true}
              onChange={compose(dispatch, driversLicenseCaptured, targetFiles)}
            />
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
