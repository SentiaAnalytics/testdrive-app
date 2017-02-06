//@flow
import React from 'react'
import type {Msg, Car} from '../model'
import TextInput  from './text-input'
import {map, compose, targetValue, preventDefault} from '../util'
import {Layout, Col, Padding} from './layout'
import Button from './button'
import {List, SelectListItem} from './list'

type Props = {
  msg: Msg,
  carForm: Car,
  models: string[]
}

export default ({msg, carForm, models}:Props) => {
  const setField = field =>
    compose(x =>  msg.setFormField('carForm', field, x), targetValue)
  return (
    <form
      style={{height:'100%'}}
      onSubmit={compose(_ => msg.submitCarModel(carForm.model), preventDefault)}
    >
      <Layout column style={{background: 'white'}}>
        <Col grow="1" shrink="1">
          <Padding>
            <h2>Add model</h2>
            <TextInput
              label="Model"
              value={carForm.model}
              onChange={setField('model')}
            />
            <List>
              {
                map(model =>
                  <SelectListItem
                    key={model}
                    title={model}
                    selected={carForm.model === model}
                    onSelect={_ => msg.setFormField('carForm', 'model', model)}
                  />
                )(models)
            }
            </List>
          </Padding>
        </Col>

        <Col>
          <Button type="submit" large block primary>Next</Button>
        </Col>
      </Layout>
    </form>
    )
}
