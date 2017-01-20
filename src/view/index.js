// @flow
import React from 'react';
import ReactDOM from 'react-dom'
import App from './app.js'
import type {Model} from '../model.js'

export default (dispatch:Function, state:Model) => {
  ReactDOM.render(<App {...{dispatch, state}}/>, document.getElementById('root'));
}
