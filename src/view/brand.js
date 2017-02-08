//@flow
import React from 'react'
import type {Msg, CarBrandForm} from '../model'
import TextInput  from './text-input'
import {contains, map, compose, targetValue, preventDefault} from '../util'
import {Layout, Col, Padding} from './layout'
import {Button} from './button'
import {SelectList} from './list'
import Icon from './icon'
import Title from './title'

type Props = {
  msg: Msg,
  brands: string[]
}

export default ({msg, brands}:Props) => {

  return (
    <Layout column style={{background: 'white'}}>
      <Col grow={1}>
        <Padding>
          <Title white> Car Brand?</Title>
          <SelectList
            title="Brand"
            items={map(value => ({label: value, value}))(brands)}
            onSelect = {msg.submitCarBrand}
          />
        </Padding>
      </Col>
    </Layout>
    )
}
