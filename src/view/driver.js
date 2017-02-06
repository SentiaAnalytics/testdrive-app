//@flow
import React from 'react'
import type {Driver, Msg} from '../model'
import {compose, targetValue, targetFiles,preventDefault, toPairs, any} from '../util'
import TextInput from './text-input'
import {Layout, Col, Padding} from './layout'
import Button from './button'
import Camera from './camera'
import Loader from './loader'

type Props = {
  driverForm: Driver,
  driver: Driver,
  msg: Msg
}

export default ({msg, driverForm, driver}:Props) => {
  const setField = field =>
    compose(x => msg.setFormField('driverForm', field, x), targetValue)

  return (
    <form
      onSubmit={compose(_ => msg.submitDriverForm(driverForm), preventDefault)}
      >
      <Loader message="Saving Drivers License" show={driver.licenseURL.status === 'PENDING'}/>
      <Layout column>
        <Col grow={1} shrink={1} style={{background: 'white'}}>
          <Padding>
            <h1>New Driver</h1>
            <Camera
              openOnLoad={true}
              onChange={compose(msg.driversLicenseCaptured, targetFiles)}
            />
            <TextInput
              label="CPR Number"
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
