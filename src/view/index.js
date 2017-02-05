// @flow
import React from 'react';
import ReactDOM from 'react-dom'
import App from './app'
import type {Model, Msg} from '../model'

export default (state:Model, msg:Msg) => {
  ReactDOM.render(<App {...{msg, state}}/>, document.getElementById('root'));
}
