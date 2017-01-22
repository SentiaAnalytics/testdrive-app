//@flow
import React from 'react'
import {Link} from 'react-router'
import type {Dispatch, Concent} from '../model'
import TextInput  from './text-input.js'
import {compose, targetValue, preventDefault} from '../util'
import {setSignature, openModal, confirmTestdrive} from '../actions'
import Signature from './signature'

type Props = {
  dispatch: Dispatch,
  signatureModal: bool,
  concentForm: Concent
}

export default ({dispatch, concentForm, signatureModal}:Props) => {
  return (
    <form
      className="full-height flex-column"
      onSubmit={compose(dispatch, () => confirmTestdrive, preventDefault) }
      >
      <div className="flex-grow-1 padding-base">
        { signatureModal ?
          <Signature
            showModal={signatureModal}
            onChange={compose(dispatch, setSignature)}
          /> : null }
        { concentForm.base64Signature ? <img src={concentForm.base64Signature}/> : null}
      </div>
      <div className="flex-grow-0 padding-base">
        <button
          onClick={compose(dispatch, () => openModal('signature'), preventDefault)}
          className="btn btn-lg btn-block"
        >
        Sign
        </button>
      </div>
      <div className="flex-grow-0">
        <input type="submit" className="btn btn-block btn-lg btn-success" value="Done"/>
      </div>
    </form>
    )
}
