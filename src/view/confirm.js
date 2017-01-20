//@flow
import React from 'react'
import {Link} from 'react-router'
import type {Dispatch, Car} from '../model'
import TextInput  from './text-input.js'
import {compose, targetValue, preventDefault} from '../util'
import {setFormField, submitCarForm, confirmTestDrive} from '../actions'
import Signature from './signature'

type Props = {
  dispatch: Dispatch,
}

export default ({dispatch}:Props) => {
  const setField = field =>
    compose(dispatch, setFormField('carForm')(field), targetValue)
  return (
    <form
      className="full-height flex-column"
      onSubmit={compose(dispatch, _ => confirmTestDrive(), preventDefault)}
      >
      <div className="flex-grow-1 padding-base">
        <Signature/>
      </div>
      <div className="flex-grow-0 flex">
        <div className="flex-grow-1">
          <Link to="/driver" className="btn btn-block btn-lg btn-danger">Clear</Link>
        </div>
        <div className="flex-grow-1">
          <input type="submit" className="btn btn-block btn-lg btn-success" value="Done"/>
        </div>
      </div>
    </form>
    )
}
