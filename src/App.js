//@flow
import React, { Component } from 'react'
import logo from './logo.svg'
import {setTitleAsync} from './actions.js'
// @flow-ignore
import './styles/main.scss'

type Model = {
  title: string,
  dispatch: Function
}

export default ({title, dispatch}: Model) =>
  <div className="container">
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <h2>{title}</h2>
      <button onClick={() => dispatch(setTitleAsync('CHANGED'))} >change title </button>
    </div>
  </div>
