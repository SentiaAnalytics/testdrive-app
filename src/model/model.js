//@flow
import type {Toast} from './toast'
import type {User, Credentials} from './user'
import type {TestdriveForm, Testdrive} from './testdrive'
import {emptyTestdriveForm} from './testdrive'
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
export type Search = {
  brand: string,
  model: string,
  licenseplate: string
}

export const emptySearch: Search = {
  brand: '',
  model: '',
  licenseplate: ''
}

export type Model = {
  search: Search,
  toast: ?Toast,
  modals: { [string]: bool },
  user: Async<User>,
  brands: string[],
  models: {[string]: string[]},
  licenseplates: string[],
  loginForm: Credentials,
  testdriveForm: Async<TestdriveForm>,
  testdriveList: Async<{[string] : Testdrive}>,
  location: Loc
}

export const emptyModel:Model = {
  toast: null,
  modals: {
    signature: false
  },
  search: emptySearch,
  user: {status: 'NONE'},
  loginForm: emptyCredentials,
  testdriveForm: {
    status: 'NONE',
    value: emptyTestdriveForm
  },
  testdriveList: { status: 'NONE' },
  brands: [],
  models: {},
  licenseplates: [],
  location: emptyLoc
}
