//@flow
import React from 'react'
import type {Msg, Car} from '../model'
import TextInput  from './text-input'
import {toUpper, map, compose, targetValue, preventDefault} from '../util'
import {Layout, Col, Padding} from './layout'
import Button from './button'
import {List, SelectListItem} from './list'

type Props = {
  msg: Msg,
  carForm: Car,
  licenseplates: string[]
}

export default ({msg, carForm, licenseplates}:Props) => {
  const setField = field =>
    compose(x => msg.setFormField('carForm', field, x), toUpper, targetValue)
  return (
    <form
      onSubmit={compose(_ => msg.submitCarLicenseplate(carForm.licenseplate), preventDefault)}
      >
      <Layout column style={{background: 'white'}}>
        <Col grow="1" shrink="1">
          <Padding>
            <h2>Add license plate</h2>
            <TextInput
              label="License plate"
              value={carForm.licenseplate}
              onChange={setField('licenseplate')} />
            <List>
              {
                map(licenseplate =>
                  <SelectListItem
                    key={licenseplate}
                    title={licenseplate}
                    selected={carForm.licenseplate === licenseplate}
                    onSelect={() => msg.setFormField('carForm', 'licenseplate', licenseplate)}
                  />
                )(licenseplates)
            }
            </List>
          </Padding>
        </Col>
        <Col>
          <Button type="submit" large primary block>Next</Button>
        </Col>
      </Layout>
    </form>
    )
}
