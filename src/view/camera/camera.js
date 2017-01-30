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
      this.refs.camera.click()
    }
  }
  render () {
    return (
      <input type="file" className="camera" accept="image/*;capture=camera" capture="camera" ref="camera" onChange={this.props.onChange}/>
    )
  }
}
