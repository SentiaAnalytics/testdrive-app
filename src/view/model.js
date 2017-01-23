//@flow
import React from 'react'
import {Link} from 'react-router'
import type {Dispatch, Car} from '../model'
import TextInput  from './text-input.js'
import {compose, targetValue, preventDefault} from '../util'
import {setFormField, submitCarModel} from '../actions'

type Props = {
  dispatch: Dispatch,
  carForm: Car
}

export default ({dispatch, carForm}:Props) => {
  const setField = field =>
    compose(dispatch, setFormField('carForm')(field), targetValue)
  return (
    <form
      className="full-height flex-column"
      onSubmit={compose(dispatch, _ => submitCarModel(carForm.model), preventDefault)}
      >
      <div className="flex-grow-1 padding-base">
      <TextInput
        label="Model"
        value={carForm.model}
        onChange={setField('model')} />
      </div>

      <div className="flex-grow-0 flex">
        <button className="btn btn-block btn-lg btn-primary">Next</button>
      </div>
    </form>
    )
}
