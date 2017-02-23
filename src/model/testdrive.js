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
  forenames: string,
  lastname: string,
  street: string,
  houseNumber: string,
  floor: string,
  apartment: string,
  postcode: string,
  city: string,
  country: string
}

export const emptyDriverForm: DriverForm = {
  forenames: '',
  lastname: '',
  street: '',
  houseNumber: '',
  floor: '',
  apartment: '',
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
  forenames: string,
  lastname: string,
  street: string,
  houseNumber: string,
  floor: string,
  apartment: string,
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
  forenames: string,
  lastname: string,
  street: string,
  houseNumber: string,
  floor: string,
  apartment: string,
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
