//@flow
import React, { Component } from 'react'
import router from './router'
import type {Dispatch, Model} from '../../model'

type Props = {
  state: Model,
  dispatch: Dispatch
}

export default ({dispatch, state}:Props) =>
  router(dispatch, state)
