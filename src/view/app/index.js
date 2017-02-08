//@flow
import React, { Component } from 'react'
import router from './router'
import type {Msg, Model} from '../../model'

type Props = {
  state: Model,
  msg: Msg
}

export default (props:Props) =>
  router(props.msg, props.state)
