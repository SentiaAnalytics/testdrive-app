//@flow

import type {Model, Credentials, User, Msg} from '../model'
import {assocPath} from '../util'
import * as task from '../tasks'
import history from '../history'

type AuthResponse = {
  user: User,
  token:string
}

export default {
  login : (state:Model, credentials:Credentials, msg:Msg) =>
    [
      assocPath(['user', 'status'])('PENDING')(state),
      task.authenticate(credentials).fold(msg.loginFail, msg.loginSuccess)
    ],

  loginSuccess: (state:Model, {user, token}: AuthResponse, msg:Msg) =>
    [{...state, user: {status:'SUCCESS', value: user}},
      task.all([
        task.setCookie('jwt')(token),
        task.historyPush('/')
      ])
    ],

  loginFail: (state:Model, err:any, msg:Msg) =>
    [
      assocPath(['user', 'status'])('FAIL')(state),
      task.call(msg.toastDanger, err.response.data)],

  validateSessionSuccess: (state:Model, user:User, msg:Msg) =>
    [
      {...state, user: {status:'SUCCESS', value: user}},
      task.historyReplace(history.location)
    ],

  validateSessionFail: (state:Model, user:User, msg:Msg) =>
    [{...state, user: {status:'FAIL'}},
      task.historyReplace('/login')
    ]

}
