//@flow
import type {Msg, CprForm} from '../model'
import React from 'react'
import TextInput from './text-input'
import {RoundButton} from './button'
import {Layout, Col, Padding} from './layout'
import {compose, preventDefault, targetValue} from '../util'
import Icon from './icon'

type Props = {
  cprForm: CprForm,
  msg: Msg
}

export default ({msg, cprForm}:Props) => {
  const updateField =
    compose(x => msg.setFormField('cprForm', 'cpr', x), targetValue)
  return (
    <form onSubmit={compose(() => msg.submitCprForm(cprForm.cpr), preventDefault)}>
      <Layout primary column center middle>
        <Col>
          <Padding>
            <TextInput
              white
              label="CPR"
              value={cprForm.cpr}
              onChange={updateField}/>
          </Padding>
            <Layout center>
              <RoundButton outline type="submit"><Icon white type="arrow_forward"/></RoundButton>
            </Layout>
        </Col>
      </Layout>
    </form>
  )
}
