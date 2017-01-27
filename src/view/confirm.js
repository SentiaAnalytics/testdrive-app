//@flow
import React from 'react'
import {Link} from 'react-router'
import type {Dispatch, Concent} from '../model'
import TextInput  from './text-input'
import {compose, targetValue, preventDefault} from '../util'
import {setSignature, openModal, confirmTestdrive} from '../actions'
import Signature from './signature'
import {Layout, Col, Padding} from './layout'
import Button from './button'

type Props = {
  dispatch: Dispatch,
  signatureModal: bool,
  concentForm: Concent
}

export default ({dispatch, concentForm, signatureModal}:Props) => {
  return (
    <form
      onSubmit={compose(dispatch, () => confirmTestdrive, preventDefault) }
      >
      <Layout column>
        <Col grow="1" shrink="1">
          <Padding>
            { signatureModal ?
              <Signature
                showModal={signatureModal}
                onChange={compose(dispatch, setSignature)}
              /> : null }
            { concentForm.base64Signature ? <img src={concentForm.base64Signature}/> : null}
          </Padding>
        </Col>
        <Col>
          <Padding>
            <Button
              onClick={compose(dispatch, () => openModal('signature'), preventDefault)}
              large
              block
            >
            Sign
            </Button>
          </Padding>
        </Col>
        <Col>
          <Button type="submit" block success large> Submit</Button>
        </Col>
      </Layout>
    </form>
    )
}
