//@flow
import React from 'react'
import {Link} from 'react-router'
import type {Dispatch, Car} from '../model'
import TextInput  from './text-input'
import {compose, targetValue, preventDefault} from '../util'
import {setFormField, submitCarLicenseplate} from '../actions'
import {Layout, Col, Padding} from './layout'
import Button from './button'

type Props = {
  dispatch: Dispatch,
  carForm: Car
}

export default ({dispatch, carForm}:Props) => {
  const setField = field =>
    compose(dispatch, setFormField('carForm')(field), targetValue)
  return (
    <form
      onSubmit={compose(dispatch, _ => submitCarLicenseplate(carForm.licenseplate), preventDefault)}
      >
      <Layout column>
        <Col grow="1" shrink="1">
          <Padding>
            <TextInput
              label="Licenseplate"
              value={carForm.licenseplate}
              onChange={setField('licenseplate')} />
          </Padding>
        </Col>
        <Col>
          <Button type="submit" large primary block>Next</Button>
        </Col>
      </Layout>
    </form>
    )
}
