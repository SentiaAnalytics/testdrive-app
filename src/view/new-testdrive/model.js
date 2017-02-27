//@flow
import React from 'react'
import type {Msg, CarModelForm} from '../../model'
import TextInput  from '../text-input'
import {map, compose, targetValue, preventDefault} from '../../util'
import {Layout, Col, Padding} from '../layout'
import {Button} from '../button'
import {SelectList} from '../list'
import Icon from '../icon'
import PageIndicator from '../page-indicator'

type Props = {
  msg: Msg,
  search: string,
  models: string[]
}

export default ({msg, models, search}:Props) => {
  return (
    <Layout column primary style={{height: '100%'}}>
      <Col>
        <Padding>
          <TextInput
            white
            label="model"
            value={search}
            onChange={compose(x => msg.search('model', x), targetValue)}
          />
        </Padding>
      </Col>
      <Col grow={1} shrink={1} white>
        <Padding>
          <SelectList
            searchQuery={search}
            items={map(value => ({label: value, value}))(models)}
            onSelect = {msg.setCarModel}
          />
        </Padding>
      </Col>
    </Layout>
  )
}
