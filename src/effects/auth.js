//@flow
import * as http from '../http'
import type {Credentials} from '../model'
import {loginFail, loginSuccess} from '../actions'

export const authenticate = (credentials:Credentials) =>
  http.post('/api/auth', credentials).fold(loginFail, loginSuccess)
