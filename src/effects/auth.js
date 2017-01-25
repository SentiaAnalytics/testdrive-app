//@flow
import * as http from '../http'
import type {Credentials} from '../model'
import {loginFail, loginSuccess} from '../actions'

export const authenticate = (credentials:Credentials) =>
  http.post('/auth', credentials).fold(
    res => loginFail(res.response.data),
    res => loginSuccess(res.data)
  )
