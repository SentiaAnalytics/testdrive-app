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
      <Col style={{width: '80%'}}>
        <Card>
          <Padding>
            <form
              onSubmit={compose(dispatch, () => login(loginForm), preventDefault)}
              >
              <div className="card-block">
                <TextInput
                  type="email"
                  label="Email"
                  value={loginForm.email}
                  onChange={setField('email')} />
                <TextInput
                  type="password"
                  label="Password"
                  value={loginForm.password}
                  onChange={setField('password')} />

                <Button type="submit" block success>Login</Button>
              </div>
            </form>
          </Padding>
          </Card>
      </Col>
    </Layout>
  )
}
