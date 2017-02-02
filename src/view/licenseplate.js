//@flow
import React from 'react'
import {Link} from 'react-router'
import type {Dispatch, Car} from '../model'
import TextInput  from './text-input'
import {toUpper, map, compose, targetValue, preventDefault} from '../util'
import {setFormField, submitCarLicenseplate} from '../actions'
import {Layout, Col, Padding} from './layout'
import Button from './button'
import {List, SelectListItem} from './list'

type Props = {
  dispatch: Dispatch,
  carForm: Car,
  licenseplates: string[]
}

export default ({dispatch, carForm, licenseplates}:Props) => {
  const setField = field =>
    compose(dispatch, setFormField('carForm')(field), toUpper, targetValue)
  return (
    <form
      onSubmit={compose(dispatch, _ => submitCarLicenseplate(carForm.licenseplate), preventDefault)}
      >
      <Layout column style={{background: 'white'}}>
        <Col grow="1" shrink="1">
          <Padding>
            <h2>Add license plate</h2>
            <TextInput
              focusOnLoad
              label="License plate"
              value={carForm.licenseplate}
              onChange={setField('licenseplate')} />
            <List>
              {
                map(licenseplate =>
                  <SelectListItem
                    title={licenseplate}
                    selected={carForm.licenseplate === licenseplate}
                    onSelect={() => dispatch(setFormField('carForm')('licenseplate')(licenseplate))}
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
