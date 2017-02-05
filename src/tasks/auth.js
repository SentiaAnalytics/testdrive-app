//@flow
import * as http from '../http'
import type {Credentials} from '../model'
import {compose, toLower, evolve} from '../util'

export const authenticate =
  compose(http.post('/api/auth'), evolve({email: toLower}))

export const validateSession =
  http.get('/api/auth')
