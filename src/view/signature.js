import React from 'react'
import SignaturePad from 'signature_pad'
import Modal from './modal'

export default class Signature extends React.Component {

  shouldComponentUpdate() {
    return false
  }

  componentDidMount () {
    var canvas = document.getElementById("signature_pad");
    canvas.width = window.innerWidth - 60
    this.signaturePad = new SignaturePad(canvas);
  }

  clear (e) {
    e.preventDefault()
    this.signaturePad.clear()
  }

  submit (e) {
    e.preventDefault()
    this.props.onChange(this.signaturePad.toDataURL())
  }

  render () {
    return (
      <div>
          <Modal isVisible={true}>
            <div className="card">
              <div className="card-block">
                <h4 className="card-title"> Sign here</h4>
              </div>
              <div className="card-block">
                <canvas id="signature_pad" height="250px" className="card"/>
              </div>
              <div className="card-block">
                <button className="card-link" onClick={e => this.clear(e)}>clear</button>
                <button className="card-link" onClick={e => this.submit(e) }>save</button>
                </div>
            </div>
          </Modal>
      </div>
    )
  }
}
