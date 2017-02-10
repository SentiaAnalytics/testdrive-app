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
import PageIndicator from './page-indicator'

type Props = {
  msg: Msg,
  search: {brand: string},
  brands: string[]
}

export default ({msg, search, brands}:Props) => {
  return (
    <Layout grow={1} column style={{height:'100%'}}>
      <Col primary>
        <Padding>
          <TextInput
            white
            label="brand"
            value={search.brand}
            onChange={compose(x => msg.search('brand', x), targetValue)}
          />
        </Padding>
      </Col>
      <Col grow={1} shrink={1} white>
        <Padding>
          <SelectList
            searchQuery={search.brand}
            items={map(value => ({label: value, value}))(brands)}
            onSelect = {msg.submitCarBrand}
          />
        </Padding>
      </Col>
    </Layout>
    )
}
