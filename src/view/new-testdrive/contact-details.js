//@flow
import React from 'react'
import type {Msg, TestdriveForm} from '../../model'
import TextInput from '../text-input'
import {compose, targetValue, preventDefault} from '../../util'
import {Layout, Col, Padding} from '../layout'
import {RoundButton} from '../button'
import Icon from '../icon'
import Title from '../title'

type Props = {
  testdriveForm: TestdriveForm,
  msg: Msg
}

export default ({msg, testdriveForm}:Props) => {
  const setField = field =>
    compose(x => msg.setFormField('testdriveForm', ['value', field], x), targetValue)

  return (
    <form
      onSubmit = {compose(x => msg.goto('/new/4'), preventDefault)}
      style={{display:'flex', height:'100%'}}
      >
      <Layout column primary>
        <Layout grow={1} shrink={1} center scroll>
          <Padding>
            <Col>
              <Padding>
                <Title white> New Driver </Title>
                <TextInput
                  white
                  required
                  label="Email"
                  value={testdriveForm.email}
                  onChange={setField('email')} />
                <TextInput
                  white
                  required
                  label="Mobile"
                  value={testdriveForm.mobile}
                  onChange={setField('mobile')} />

                <Layout center>
                  <Padding>
                    <RoundButton outline type="submit"><Icon white type="arrow_forward"/></RoundButton>
                  </Padding>
                </Layout>
              </Padding>
            </Col>
          </Padding>
        </Layout>
      </Layout>
    </form>
  )
}
