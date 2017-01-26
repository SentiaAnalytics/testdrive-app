//@flow
import React from 'react'
import {Link} from 'react-router'
import type {Dispatch, Car} from '../model'
import TextInput  from './text-input.js'
import {compose, targetValue, preventDefault} from '../util'
import {setFormField, submitCarBrand} from '../actions'

type Props = {
  dispatch: Dispatch,
  carForm: Car,
  brands: string[]
}

export default ({dispatch, carForm, brands}:Props) => {
  const setField = field =>
    compose(dispatch, setFormField('carForm')(field), targetValue)
  return (
    <form
      className="full-height flex-column"
      onSubmit={compose(dispatch, _ => submitCarBrand(carForm.brand), preventDefault)}
      >
      <div className="flex-grow-1 padding-base">
        <TextInput
          label="Brand"
          value={carForm.brand}
          onChange={setField('brand')}
        />
        <select
          onChange={setField('brand')}
          defaultValue={carForm.brand}
        >
          {
            brands.map((brand, ix) =>
              <option value={brand} key={ix}>{brand}</option>)
          }
        </select>
      </div>

      <div className="flex-grow-0 flex">
        <button className="btn btn-block btn-lg btn-primary">Next</button>
      </div>
    </form>
    )
}
