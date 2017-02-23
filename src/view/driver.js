//@flow
import React from 'react'
import type {DriverForm, Msg} from '../model'
import {compose, targetValue, targetFiles,preventDefault, toPairs, any} from '../util'
import TextInput from './text-input'
import {Layout, Col, Padding} from './layout'
import {RoundButton} from './button'
import Icon from './icon'
import Loader from './loader'
import Title from './title'
import PageIndicator from './page-indicator'

type Props = {
  driverForm: DriverForm,
  msg: Msg
}

export default ({msg, driverForm}:Props) => {
  const setField = field =>
    compose(x => msg.setFormField('driverForm', field, x), targetValue)

  return (
    <form
      onSubmit = {compose(x => msg.submitDriverForm(driverForm), preventDefault)}
      style={{display:'flex', height:'100%'}}
      >
      <Layout column primary>
        <Layout grow={1} shrink={1} center scroll>
          <Padding>
            <Col>
              <Padding>
                <Title white> New Driver </Title>
                <TextInput
                  white
                  required
                  label="Forenames"
                  value={driverForm.forenames}
                  onChange={setField('forenames')} />
                <TextInput
                  white
                  required
                  label="Lastname"
                  value={driverForm.lastname}
                  onChange={setField('lastname')} />

                <TextInput
                  white
                  required
                  label="street"
                  value={driverForm.street}
                  onChange={setField('street')} />

                <TextInput
                  white
                  required
                  label="House number"
                  value={driverForm.houseNumber}
                  onChange={setField('houseNumber')} />

                <TextInput
                  white
                  label="Floor"
                  value={driverForm.floor}
                  onChange={setField('floor')} />

                <TextInput
                  white
                  label="Apartment"
                  value={driverForm.aparment}
                  onChange={setField('apartment')} />

                <TextInput
                  white
                  required
                  label="Postcode"
                  value={driverForm.postcode}
                  onChange={setField('postcode')} />

                <TextInput
                  white
                  required
                  label="City"
                  value={driverForm.city}
                  onChange={setField('city')} />

                <TextInput
                  white
                  required
                  label="Country"
                  value={driverForm.country}
                  onChange={setField('country')} />

                <Layout center>
                  <Padding>
                    <RoundButton outline type="submit"><Icon white type="arrow_forward"/></RoundButton>
                  </Padding>
                </Layout>
              </Padding>
            </Col>
          </Padding>
        </Layout>
      </Layout>
    </form>
  )
}
