//@flow
import type {Toast} from './toast'
import type {User, Credentials} from './user'
import type {Testdrive, Driver, Car, Concent} from './testdrive'
import {emptyDriver, emptyCar, emptyConcent, emptyTestdrive } from './testdrive'
import {emptyUser, emptyCredentials  } from './user'


export type Model = {
  toast: ?Toast,
  modals: { [string]: bool },
  user: ?User,
  driverForm: Driver,
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
  user: null,
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
  location: '/'
}
