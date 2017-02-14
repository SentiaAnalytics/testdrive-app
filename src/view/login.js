//@flow
import React from 'react'
import type {Credentials, Async, User, Msg} from '../model'
import {preventDefault, compose, targetValue} from '../util'
import TextInput from './text-input'
import {Layout, Col, Padding} from './layout'
import {Button} from './button'
import Card from './card'
import Loader from './loader'

type Props = {
  msg: Msg,
  loginForm: Credentials,
  user: Async<User>
}

export default ({msg, loginForm, user}:Props) => {
  const setField = field =>
    compose(x =>  msg.setFormField('loginForm', field, x), targetValue)
  return (
    <Layout column center middle>
      <Col style={{width: '80%', maxWidth: '660px'}}>
        <Card>
          <form
            onSubmit={compose(_ => msg.login(loginForm), preventDefault)}
            >
            <Loader message="Signing In" show={user.status === 'PENDING'}/>
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
            <Button type="submit" square block success>Login</Button>
          </form>
          </Card>
      </Col>
    </Layout>
  )
}
