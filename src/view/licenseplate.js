//@flow
import React from 'react'
import type {Msg, LicenseplateForm} from '../model'
import TextInput  from './text-input'
import {toUpper, map, compose, targetValue, preventDefault} from '../util'
import {Layout, Col, Padding} from './layout'
import {Button} from './button'
import {SelectList} from './list'
import PageIndicator from './page-indicator'
import Icon from './icon'

type Props = {
  msg: Msg,
  search: string,
  licenseplates: string[]
}

export default ({msg, search, licenseplates}:Props) =>
  <Layout column>
    <Col primary>
      <Padding>
        <Layout space-between>
          <Icon white type="chevron_left"/>
          <PageIndicator current={6} of={6}/>
          <Icon type="face" primary/>
        </Layout>
      </Padding>
      <Padding>
        <TextInput
          white
          label="licenseplate"
          value={search}
          onChange={compose(x => msg.search('licenseplate', x), targetValue)}
        />
      </Padding>
    </Col>
    <Col grow="1" shrink="1">
      <Padding>
        <SelectList
          searchQuery={search}
          items={map(value => ({label: value, value}))(licenseplates)}
          onSelect = {msg.submitCarLicenseplate}
        />
      </Padding>
    </Col>
  </Layout>
