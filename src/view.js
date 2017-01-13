// @flow
import App from './App.js'
import React from 'react'

type Model = {
  title: string
}

export default (dispatch:Function) => (model: Model) =>
  <App {...{dispatch, ...model}}/>
