//@flow
import React from 'react'
import SignaturePad from 'signature_pad'
import Modal from './modal'
import Card from './card'
import {Button} from './button'
import {Layout, Padding} from './layout'

export default class Signature extends React.Component {
  signaturePad: any;
  shouldComponentUpdate() {
    return false
  }

  componentDidMount () {
    var canvas = document.getElementById("signature_pad");
    this.signaturePad = new SignaturePad(canvas);
  }

  clear (e:Event) {
    e.preventDefault()
    this.signaturePad.clear()
  }

  submit (e:Event) {
    e.preventDefault()
    this.props.onChange(this.signaturePad.toDataURL())
  }

  render () {
    return (
      <Modal isVisible={true}>
        <Card>
          <Padding>
            <h4> Sign here</h4>
          </Padding>
          <canvas style={{width:'100%'}} id="signature_pad" ref={(e) => e ? (e.width = e.offsetWidth) : null}/>
          <Layout>
            <Button block link onClick={e => this.clear(e)}>Clear</Button>
            <Button block link onClick={e => this.submit(e) }>
            save
            </Button>
          </Layout>
        </Card>
      </Modal>
    )
  }
}
