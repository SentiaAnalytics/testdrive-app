//@flow
import type {Msg, CprForm} from '../model'
import React from 'react'
import TextInput from './text-input'
import {RoundButton} from './button'
import {Layout, Col, Padding} from './layout'
import {compose, preventDefault, targetValue} from '../util'
import Icon from './icon'
import PageIndicator from './page-indicator'

type Props = {
  cprForm: CprForm,
  msg: Msg
}

export default ({msg, cprForm}:Props) => {
  const updateField =
    compose(x => msg.setFormField('cprForm', 'cpr', x), targetValue)
  return (
    <form
      onSubmit={compose(() => msg.submitCprForm(cprForm.cpr), preventDefault)}
      style={{display: 'flex', flexGrow: 1}}
      >
      <Layout column primary>
        <Col>
          <Padding>
            <Layout space-between>
              <Icon white type="chevron_left"/>
                <PageIndicator current={2} of={6}/>
              <Icon primary type="chevron_right"/>
            </Layout>
          </Padding>
        </Col>
        <Layout grow={1} primary column center middle>
          <Col>
            <Padding>
              <TextInput
                lg
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
      </Layout>
    </form>
  )
}
