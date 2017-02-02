//@flow
import * as http from '../http'
import type {Credentials} from '../model'
import {loginFail, loginSuccess, validateSessionSuccess, validateSessionFail} from '../actions'
import {compose, toLower, evolve} from '../util'

export const authenticate =
  compose(m => m.fold(loginFail, loginSuccess), http.post('/api/auth'), evolve({email: toLower}))

export const validateSession =
  http.get('/api/auth')
    .fold(validateSessionFail, validateSessionSuccess)
