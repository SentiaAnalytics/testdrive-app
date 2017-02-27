//@flow
import type {Async} from './generic'

export type TestdriveForm = {
  cpr: string,
  licenseUrl: Async<string>,
  driver: Async<{
    forenames: string,
    lastname: string,
    street: string,
    houseNumber: string,
    floor: string,
    apartment: string,
    postcode: string,
    city: string,
    country: string
  }>,
  carBrand: string,
  carModel: string,
  licenseplate: string,
  email: string,
  mobile: string,
  base64Signature: Async<string>,
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
  mobile: string,
  base64Signature: string,
}

export const emptyTestdriveForm:TestdriveForm = {
  cpr: '',
  driver: {
    status: 'NONE',
    value: {
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
  },
  email: '',
  mobile: '',
  base64Signature: {status: 'NONE'},
  carBrand: '',
  carModel: '',
  licenseplate: '',
  licenseUrl: {status: 'NONE'},
}
