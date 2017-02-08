//@flow
import React from 'react'
import type {Msg, LicenseplateForm} from '../model'
import TextInput  from './text-input'
import {toUpper, map, compose, targetValue, preventDefault} from '../util'
import {Layout, Col, Padding} from './layout'
import {Button} from './button'
import {SelectList} from './list'

type Props = {
  msg: Msg,
  licenseplateForm: LicenseplateForm,
  licenseplates: string[]
}

export default ({msg, licenseplateForm, licenseplates}:Props) =>
  <Layout column style={{background: 'white'}}>
    <Col grow="1" shrink="1">
      <Padding>
        <h2>Add license plate</h2>
      <SelectList
        title="Licenseplate"
        items={map(value => ({label: value, value}))(licenseplates)}
        onSelect = {msg.submitCarLicenseplate}
      />
      </Padding>
    </Col>
  </Layout>
