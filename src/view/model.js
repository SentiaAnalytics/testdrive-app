//@flow
import React from 'react'
import type {Msg, CarModelForm} from '../model'
import TextInput  from './text-input'
import {map, compose, targetValue, preventDefault} from '../util'
import {Layout, Col, Padding} from './layout'
import {Button} from './button'
import {SelectList} from './list'

type Props = {
  msg: Msg,
  models: string[]
}

export default ({msg, models}:Props) =>
  <Layout column style={{background: 'white'}}>
    <Col grow="1" shrink="1">
      <Padding>
        <h2>Add model</h2>
        <SelectList
          title="Model"
          items={map(value => ({label: value, value}))(models)}
          onSelect = {msg.submitCarModel}
        />
      </Padding>
    </Col>
  </Layout>
