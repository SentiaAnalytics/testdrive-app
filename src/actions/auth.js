//@flow
import type {Action, Credentials, User} from '../model'

export const login = (payload:Credentials) => ({type: 'LOGIN', payload})
export const loginFail = (payload:any) => ({type: 'LOGIN_FAIL', payload})
export const loginSuccess = (payload:User) => ({type: 'LOGIN_SUCCESS', payload})
export const validateSessionFail = (payload:User) => ({type: 'VALIDATE_SESSION_FAIL', payload})
export const validateSessionSuccess = (payload:User) => ({type: 'VALIDATE_SESSION_SUCCESS', payload})
