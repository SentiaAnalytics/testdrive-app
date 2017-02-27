//@flow
import type {Msg, TestdriveForm} from '../../model'
import React from 'react'
import TextInput from '../text-input'
import {RoundButton} from '../button'
import {Layout, Col, Padding} from '../layout'
import {compose, preventDefault, targetValue} from '../../util'
import Icon from '../icon'
import PageIndicator from '../page-indicator'
import Loader from '../loader'

type Props = {
  testdriveForm: TestdriveForm,
  msg: Msg
}

export default ({msg, testdriveForm}:Props) => {
  const {value: formData} = testdriveForm
  const updateField =
    compose(x => msg.setFormField('testdriveForm', ['value', 'cpr'], x), targetValue)
  return (
    <form
      onSubmit={compose(() => msg.submitCprForm(formData.cpr), preventDefault)}
      style={{display: 'flex', height:'100%'}}
      >
      <Layout column primary>
        <Layout grow={1} primary column center middle>
          <Col>
            <Padding>
              <TextInput
                lg
                white
                label="CPR"
                value={formData.cpr}
                onChange={updateField}/>
            </Padding>
              <Layout center>
                <RoundButton outline type="submit"><Icon white type="arrow_forward"/></RoundButton>
              </Layout>
          </Col>
        </Layout>
      </Layout>
    </form>
  )
}
