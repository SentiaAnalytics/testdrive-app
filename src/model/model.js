//@flow
import type {Toast} from './toast'
import type {User, Credentials} from './user'
import type {TestdriveRequest, Testdrive, DriverForm, ConsentForm, CprForm} from './testdrive'
import {emptyDriverForm,  emptyConsentForm, emptyTestdriveRequest, emptyCprForm} from './testdrive'
import {emptyUser, emptyCredentials  } from './user'
import type {Async, Dict} from './generic'

export type Loc = {
  pathname: string,
  params: Dict,
  query: Dict
}

export const emptyLoc = {
  pathname: '/',
  params: {},
  query: {}
}

export type Model = {
  testdriveStatus: string,
  toast: ?Toast,
  modals: { [string]: bool },
  user: Async<User>,
  cprForm: CprForm,
  driverForm: DriverForm,
  brands: string[],
  models: string[],
  licenseplates: string[],
  loginForm: Credentials,
  consentForm: ConsentForm,
  testdriveRequest: TestdriveRequest,
  testdriveList: Async<{[string] : Testdrive}>,
  location: Loc
}

export const emptyModel:Model = {
  testdriveStatus: 'NONE',
  toast: null,
  modals: {
    signature: false
  },
  user: {status: 'NONE'},
  loginForm: emptyCredentials,
  cprForm: emptyCprForm,
  driverForm: emptyDriverForm,
  consentForm: emptyConsentForm,
  testdriveRequest: emptyTestdriveRequest,
  testdriveList: { status: 'NONE' },
  brands: [],
  models: [],
  licenseplates: [],
  location: emptyLoc
}
