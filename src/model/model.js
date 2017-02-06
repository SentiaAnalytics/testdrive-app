//@flow
import type {Toast} from './toast'
import type {User, Credentials} from './user'
import type {Testdrive, Driver, Car, Consent} from './testdrive'
import {emptyDriver, emptyCar, emptyConsent, emptyTestdrive } from './testdrive'
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
  toast: ?Toast,
  modals: { [string]: bool },
  user: Async<User>,
  driverForm: Driver,
  brands: string[],
  models: string[],
  licenseplates: string[],
  carForm: Car,
  loginForm: Credentials,
  consentForm: Consent,
  testdrive: Testdrive,
  testdriveList: Async<Testdrive[]>,
  location: Loc
}

export const emptyModel:Model = {
  toast: null,
  modals: {
    signature: false
  },
  user: {status: 'NONE'},
  loginForm: emptyCredentials,
  driverForm: emptyDriver,
  carForm: emptyCar,
  consentForm: emptyConsent,
  testdrive: emptyTestdrive,
  testdriveList: { status: 'NONE' },
  licenseplateForm: {
    licenseplate: ''
  },
  brands: [],
  models: [],
  licenseplates: [],
  location: emptyLoc
}
