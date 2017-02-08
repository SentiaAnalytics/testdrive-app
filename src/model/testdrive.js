//@flow
import type {Async} from './generic'

export type ConsentForm = {
  base64Signature:string
}

export const emptyConsentForm:ConsentForm = {
  base64Signature: ''
}

export type CprForm = {
  cpr: string
}

export const emptyCprForm: CprForm = {
  cpr: ''
}


export type DriverForm = {
  firstname: string,
  lastname: string,
  addressLine1: string,
  addressLine2: string,
  postcode: string,
  city: string,
  country: string
}

export const emptyDriverForm: DriverForm = {
  firstname: '',
  lastname: '',
  addressLine1: '',
  addressLine2: '',
  postcode: '',
  city: '',
  country: '',
}

export type ContactForm = {
  email: string,
  phone: string
}

export const emptyContactForm: ContactForm = {
  email: '',
  phone: ''
}


export type TestdriveRequest = {
  cpr: string,
  licenseUrl: Async<string>,
  firstname: string,
  lastname: string,
  addressLine1: string,
  addressLine2: string,
  postcode: string,
  city: string,
  country: string,
  carBrand: string,
  carModel: string,
  licenseplate: string,
  email: string,
  phone: string,
  base64Signature: string,
}

export type Testdrive = {
  id: string,
  user: string,
  dealership: string,
  date: string,
  cpr: string,
  licenseUrl: Async<string>,
  firstname: string,
  lastname: string,
  addressLine1: string,
  addressLine2: string,
  postcode: string,
  city: string,
  country: string,
  carBrand: string,
  carModel: string,
  licenseplate: string,
  email: string,
  phone: string,
  base64Signature: string,
}
export const emptyTestdriveRequest:TestdriveRequest = {
  licenseUrl: {status: 'NONE'},
  ...emptyCprForm,
  ...emptyDriverForm,
  ...emptyContactForm,
  ...emptyConsentForm,
  carBrand: '',
  carModel: '',
  licenseplate: ''
}
