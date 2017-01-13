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
  root: Object
}

export default ({view, update, model, root}:Props) => {
  const dispatch = (action) => store.dispatch(action)

  const store = createStore(cmdHandler(dispatch, update), model, reduxExtension)
  store.subscribe(() =>render(store.getState()))
  const App = view(store.dispatch)
  const render = (model) => {
    ReactDOM.render( <App {...model} />, root);
  }
  render(store.getState())
  return store
}
