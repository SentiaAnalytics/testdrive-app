//@flow
import React from 'react'
import {Link} from 'react-router'
import type {Dispatch, Car} from '../model'
import TextInput  from './text-input'
import {compose, targetValue, preventDefault} from '../util'
import {setFormField, submitCarModel} from '../actions'
import {Layout, Col, Padding} from './layout'
import Button from './button'

type Props = {
  dispatch: Dispatch,
  carForm: Car,
  models: string[]
}

export default ({dispatch, carForm, models}:Props) => {
  const setField = field =>
    compose(dispatch, setFormField('carForm')(field), targetValue)
  return (
    <form
      style={{height:'100%'}}
      onSubmit={compose(dispatch, _ => submitCarModel(carForm.model), preventDefault)}
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
            <select
              onChange={setField('model')}
              defaultValue={carForm.model}
            >
            {
              models.map((model, ix) =>
                <option value={model} key={ix}>{model}</option>)
            }
            </select>
          </Padding>
        </Col>

        <Col>
          <Button type="submit" large block primary>Next</Button>
        </Col>
      </Layout>
    </form>
    )
}
