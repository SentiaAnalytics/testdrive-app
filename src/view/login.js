//@flow
import React from 'react'
import type {Credentials} from '../model'
import {login, setFormField} from '../actions'
import {preventDefault, compose, targetValue} from '../util'
import TextInput from './text-input'
import {Layout, Col, Padding} from './layout'
import Button from './button'
import Card from './card'

type Props = {
  dispatch: Function,
  loginForm: Credentials
}

export default ({dispatch, loginForm}:Props) => {
  const setField = field =>
    compose(dispatch, setFormField('loginForm')(field), targetValue)
  return (
    <Layout column center middle>
      <Col style={{width: '80%', maxWidth: '660px'}}>
        <Card>
          <form
            onSubmit={compose(dispatch, () => login(loginForm), preventDefault)}
            >
            <Padding style={{padding: '50px 50px 30px'}}>
              <TextInput
                type="email"
                label="Email"
                value={loginForm.email}
                onChange={setField('email')}
              />
              <TextInput
                type="password"
                label="Password"x
                value={loginForm.password}
                onChange={setField('password')}
              />
            </Padding>
            <Button type="submit" block success>Login</Button>
          </form>
          </Card>
      </Col>
    </Layout>
  )
}
