//@flow
import React from 'react'
import type {Credentials} from '../model'
import {login, setFormField} from '../actions'
import {preventDefault, compose, targetValue} from '../util'
import TextInput from './text-input'

type Props = {
  dispatch: Function,
  loginForm: Credentials
}

export default ({dispatch, loginForm}:Props) => {
  const setField = field =>
    compose(dispatch, setFormField('loginForm')(field), targetValue)
  return (
    <div className="flex-column">
      <div className="flex-grow-1 list-group scroll-y align-items-center justify-content-center">
        <form
          className="card"
          style={{width: '80%'}}
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
            <input className="btn btn-block btn-success btn-lg" type="submit" value="Login"/>
          </div>
          </form>
      </div>
    </div>
  )
}
