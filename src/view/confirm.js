//@flow
import React from 'react'
import type {Msg, Consent} from '../model'
import TextInput  from './text-input'
import {compose, targetValue, preventDefault} from '../util'
import Signature from './signature'
import {Layout, Col, Padding} from './layout'
import Button from './button'
import Loader from './loader'

type Props = {
  msg: Msg,
  testdriveStatus:string,
  signatureModal: bool,
  consentForm: Consent
}

export default ({msg, consentForm, signatureModal, testdriveStatus}:Props) => {
  return (
    <form
      onSubmit={compose(_ => msg.confirmTestdrive(), preventDefault) }
      >
      <Loader message="Submitting Testdrive" show={testdriveStatus === 'PENDING'}/>
      <Layout column style={{background: 'white'}}>
        <Col grow="1" shrink="1">
          <Padding>
            <h2>Confirm test drive</h2>
          </Padding>
          <Padding>
            { signatureModal ?
              <Signature
                showModal={signatureModal}
                onChange={msg.setSignature}
              /> : null }
            { consentForm.base64Signature ? <img src={consentForm.base64Signature}/> : null}
          </Padding>
        </Col>
        <Col>
          <Padding>
            <Button
              onClick={compose(_ => msg.openModal('signature'), preventDefault)}
              block
              primary
            >
            { consentForm.base64Signature ? 'Change signature' : 'Place signature' }
            </Button>
          </Padding>
        </Col>
        <Col>
          <Button type="submit" block success large disabled={!consentForm.base64Signature || undefined}> Submit</Button>
        </Col>
      </Layout>
    </form>
    )
}
