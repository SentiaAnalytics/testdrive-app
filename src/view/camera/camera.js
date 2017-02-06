//@flow
import React from 'react'
import './camera.scss'

type Props = {
  openOnLoad?: bool,
  onChange:Function
}


export default class Camera extends React.Component {
  componentDidMount() {
    if (this.props.openOnLoad) {
      console.log(this.refs.camera)
      setTimeout(() => this.refs.camera.click(), 200)
    }
  }
  render () {
    return (
      <input id="camera" type="file" className="camera" accept="image/*" capture="camera" ref="camera" onChange={this.props.onChange}/>
    )
  }
}
