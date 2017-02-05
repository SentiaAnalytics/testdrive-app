//@flow
import React, { Component } from 'react'
import router from './router'
import type {Dispatch, Model} from '../../model'

type Props = {
  state: Model,
  dispatch: Dispatch
}

export default class App extends React.Component {
  state:{ height: number }
  constructor (props:Props) {
    super(props)
    this.state = {height:window.innerHeight}

  }
  componentDidMount() {
    this.setState({height: window.innerHeight})
  }
  render () {
    return (
      <div style={{height:this.state.height}}>
        {router(this.props.msg, this.props.state)}
      </div>
    )
  }
}
