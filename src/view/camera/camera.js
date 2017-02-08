//@flow
import React from 'react'
import {Layout} from '../layout'
import {RoundButton} from '../button'
import Icon from '../icon'
import './camera.scss'

type Props = {
  openOnLoad?: bool,
  onChange:Function
}


export default class Camera extends React.Component {
  componentDidMount() {
    if (this.props.openOnLoad) {
      setTimeout(() => this.refs.camera.click(), 200)
    }
  }
  render () {
    return (
      <Layout center>
        <RoundButton warning outline xl onClick={() => this.refs.camera.click()}>
          <Icon xl type="camera_alt"/>
        </RoundButton>
        <input type="file" className="camera-input" accept="image/*" capture="camera" ref="camera" onChange={this.props.onChange}/>
      </Layout>
    )
  }
}
