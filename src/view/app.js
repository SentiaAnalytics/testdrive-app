//@flow
import React, { Component } from 'react'
import logo from '../logo.svg'
import router from './router'
import type {Dispatch, Model} from '../model'
// @flow-ignore
import '../styles/main.scss'

type Props = {
  state: Model,
  dispatch: Dispatch
}

export default ({dispatch, state}:Props) =>
  router(dispatch, state)
