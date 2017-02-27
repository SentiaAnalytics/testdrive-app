//@flow
import React from 'react'
import type {Msg, ContactForm} from '../model'
import TextInput from './text-input'
import {compose, targetValue, preventDefault} from '../util'
import {Layout, Col, Padding} from './layout'
import {RoundButton} from './button'
import Icon from './icon'
import Title from './title'

type Props = {
  contactForm: ContactForm,
  msg: Msg
}

export default ({msg, contactForm}:Props) => {
  const setField = field =>
    compose(x => msg.setFormField('driverForm', field, x), targetValue)

  return (
    <form
      onSubmit = {compose(x => msg.submitContactForm(contactForm), preventDefault)}
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
                  value={contactForm.email}
                  onChange={setField('email')} />
                <TextInput
                  white
                  required
                  label="Mobile"
                  value={contactForm.mobile}
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
