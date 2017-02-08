//@flow
import React from 'react'
import type {Driver, Msg} from '../model'
import {compose, targetValue, targetFiles,preventDefault, toPairs, any} from '../util'
import TextInput from './text-input'
import {Layout, Col, Padding} from './layout'
import {RoundButton} from './button'
import Icon from './icon'
import Loader from './loader'
import Title from './title'

type Props = {
  driverForm: Driver,
  msg: Msg
}

export default ({msg, driverForm}:Props) => {
  const setField = field =>
    compose(x => msg.setFormField('driverForm', field, x), targetValue)

  return (
    <form
      onSubmit = {compose(x => msg.submitDriverForm(driverForm), preventDefault)}
      >
      <Layout primary>
        <Padding>
          <Col>
            <Padding>
              <Title white> New Driver </Title>
              <TextInput
                white
                required
                label="Firstname"
                value={driverForm.firstname}
                onChange={setField('firstname')} />
              <TextInput
                white
                required
                label="Lastname"
                value={driverForm.lastname}
                onChange={setField('lastname')} />

              <TextInput
                white
                label="Address Line 1"
                value={driverForm.addressLine1}
                onChange={setField('addressLine1')} />

              <TextInput
                white
                label="Adress line 2"
                value={driverForm.addressLine2}
                onChange={setField('addressLine2')} />

              <TextInput
                white
                label="Postcode"
                value={driverForm.postcode}
                onChange={setField('postcode')} />

              <TextInput
                white
                label="City"
                value={driverForm.city}
                onChange={setField('city')} />

              <TextInput
                white
                label="Country"
                value={driverForm.country}
                onChange={setField('country')} />
            </Padding>

            <Layout center>
              <RoundButton outline type="submit"><Icon white type="arrow_forward"/></RoundButton>
            </Layout>
          </Col>
        </Padding>
      </Layout>
    </form>
  )
}
