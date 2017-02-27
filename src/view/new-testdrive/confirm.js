//@flow
import React from 'react'
import type {Msg, TestdriveForm} from '../../model'
import TextInput  from '../text-input'
import {compose, targetValue, preventDefault} from '../../util'
import Signature from '../signature'
import {Layout, Col, Padding} from '../layout'
import {Button} from '../button'
import Loader from '../loader'

type Props = {
  msg: Msg,
  signatureModal: bool,
  testdriveForm: TestdriveForm
}

export default ({msg, testdriveForm, signatureModal}:Props) => {
  const {value: formData, status} = testdriveForm
  return (
    <form
      onSubmit={compose(_ => msg.confirmTestdrive(), preventDefault) }
      style= {{display: 'flex', height: '100%'}}
      >
      <Loader message="Submitting Testdrive" show={status === 'PENDING'}/>
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
            { formData.base64Signature ? <img src={formData.base64Signature}/> : null}
          </Padding>
        </Col>
        <Col>
          <Padding>
            <Button
              square
              onClick={compose(_ => msg.openModal('signature'), preventDefault)}
              block
              primary
            >
            { formData.base64Signature ? 'Change signature' : 'Place signature' }
            </Button>
          </Padding>
        </Col>
        <Col>
          <Button type="submit" square block success large disabled={!formData.base64Signature || undefined}> Submit</Button>
        </Col>
      </Layout>
    </form>
    )
}
