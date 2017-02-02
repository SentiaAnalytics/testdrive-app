//@flow
import type {Toast} from './toast'
import type {User, Credentials} from './user'
import type {Testdrive, Driver, Car, Concent} from './testdrive'
import {emptyDriver, emptyCar, emptyConcent, emptyTestdrive } from './testdrive'
import {emptyUser, emptyCredentials  } from './user'
import type {Async} from './generic'



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
  concentForm: Concent,
  testdrive: Testdrive,
  testdriveList: Testdrive[],
  location: string
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
  concentForm: emptyConcent,
  testdrive: emptyTestdrive,
  testdriveList: [],
  licenseplateForm: {
    licenseplate: ''
  },
  brands: [],
  models: [],
  licenseplates: [],
  location: '/'
}
