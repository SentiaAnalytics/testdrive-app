//@flow
import type {Async} from './generic'

export type Consent = {
  base64Signature:string
}

export const emptyConsent:Consent = {
  base64Signature: ''
}


export type Driver = {
  cpr: string,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  licenseURL: Async<string>,
}

export const emptyDriver:Driver = {
  cpr: '',
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  licenseURL: { status: 'NONE' }
}

export type Car = {
  brand: string,
  model: string,
  licenseplate: string
}

export const emptyCar:Car = {
  brand: '',
  model: '',
  licenseplate: ''
}

export type Testdrive = {
  driver: Driver,
  car: Car,
  consent: Consent
}

export const emptyTestdrive:Testdrive = {
  driver: emptyDriver,
  car: emptyCar,
  consent: emptyConsent
}
