//@flow
import React from 'react'
import {Link} from 'react-router'
import type {Dispatch, Car} from '../model'
import TextInput  from './text-input'
import {map, compose, targetValue, preventDefault} from '../util'
import {setFormField, submitCarBrand} from '../actions'
import {Layout, Col, Padding} from './layout'
import Button from './button'
import {List, SelectListItem} from './list'
import Icon from './icon'

type Props = {
  dispatch: Dispatch,
  carForm: Car,
  brands: string[]
}

export default ({dispatch, carForm, brands}:Props) => {
  const setField = field =>
    compose(dispatch, setFormField('carForm')(field), targetValue)

  const selectBrand = brand =>
    brand === carForm.brand ?
    dispatch(setFormField('carForm')('brand')(""))
    : dispatch(setFormField('carForm')('brand')(brand))

  const filteredBrands = brands.filter(x => x.toLowerCase().indexOf(carForm.brand.toLowerCase()) !== -1)

  return (
    <form
      onSubmit={compose(dispatch, _ => submitCarBrand(carForm.brand), preventDefault)}
      >
      <Layout column style={{background: 'white'}}>
        <Col grow={1} shrink={1}>
          <Padding>
            <h2>Add brand</h2>
            <TextInput
              label="Brand"
              value={carForm.brand}
              onChange={setField('brand')} />
            <List>
              {
                map(brand =>
                  <SelectListItem
                    title={brand}
                    selected={carForm.brand === brand}
                    onSelect={() =>selectBrand(brand)}
                  />
                )(filteredBrands)
            }
            </List>
          </Padding>
        </Col>
      <Col>
        <Button type="submit" block primary large>Next</Button>
      </Col>
      </Layout>
    </form>
    )
}
