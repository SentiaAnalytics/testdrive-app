// @flow
import React from 'react';
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {cmdHandler} from './cmd'

const reduxExtension = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : x => x;

type Props = {
  view: Function,
  update: Function,
  model: Object,
}

export default ({view, update, model}:Props) => {
  const dispatch = (action) => store.dispatch(action)

  const store = createStore(cmdHandler(dispatch, update), model, reduxExtension)
  store.subscribe(() => view(dispatch, store.getState()))
  view(dispatch, store.getState())

  return store
}
