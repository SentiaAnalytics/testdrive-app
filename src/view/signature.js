import React from 'react'
import SignaturePad from 'signature_pad'

export default class Signature extends React.Component {

  shouldComponentUpdate() {
    return false
  }

  componentDidMount () {
    var canvas = document.getElementById("signature_pad");
    canvas.width = window.innerWidth - 30
    this.signaturePad = new SignaturePad(canvas);
  }

  clear () {
    this.signaturePad.clear()
  }

  submit () {
    this.props.onSubmit(this.signaturePad.toDataURL("image/jpeg"))
  }

  render () {
    return (
      <div>
        <h5> Sign here</h5>
        <div className="card">
          <canvas id="signature_pad" height="300px"/>
        </div>
      </div>
    )
  }
}
