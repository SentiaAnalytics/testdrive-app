import React from 'react'
import {compressImage} from '../util'
export default class Test extends React.Component {
  state: {file: ?File}
  constructor() {
    super()
    this.state = {file:null}
  }
  capturedPicture(e:any) {
  const file = e.target.files[0];
  const $image = document.getElementById('image')
  compressImage(file, {})
    .fork(console.error, blob =>
      $image.src = window.URL.createObjectURL(blob))
  }
  render() {
      return (
        <div>
        <h1>Test</h1>
          <div>
          <img id="image"/>
          </div>
          <input id="file" type="file" accept="image/*" capture="camera" ref="camera" onChange={e => this.capturedPicture(e)}/>
        </div>
      )

  }

}
