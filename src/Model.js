//@flow

export type Functor = {map: Function}
export type Dict = { [string]: any }
export type Dispatch = (a:Action) => void

export type ActionType = 'NO_OP'
  | 'SET_TITLE'
  | 'SET_TITLE_ASYNC'
  | 'HISTORY_PUSH'
  | 'HISTORY_REPLACE'
  | 'SET_FORM_FIELD'
  | 'SUBMIT_DRIVER_FORM'
  | 'SUBMIT_DRIVER_FORM_SUCCESS'
  | 'SUBMIT_CAR_FORM'
  | 'SUBMIT_CAR_FORM_SUCCESS'
  | 'CONFIRM_TEST_DRIVE'
  | 'CONFIRM_TEST_DRIVE_SUCCESS'

export type Action = {
  type: ActionType,
  payload?: any
}

export type Driver = {
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  addressLine1: string,
  addressLine2: string,
  postcode: string,
  city: string,
  country: string
}

export const emptyDriver:Driver = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  postcode: '',
  city: '',
  country:''
}

export type Car = {
  make: string,
  model: string,
  licenseplate: string
}

export const emptyCar:Car = {
  make: '',
  model: '',
  year: '',
  licenseplate: ''
}

export type Testdrive = {
  driver: Driver,
  car: Car
}

export const emptyTestdrive:Testdrive = {
  driver: emptyDriver,
  car: emptyCar
}

export type Model = {
  driverForm: Driver,
  carForm: Car,
  testdrive: Testdrive,
  location: string
}

export const emptyModel:Model = {
  driverForm: emptyDriver,
  carForm: emptyCar,
  testdrive: emptyTestdrive,
  licenseplateForm: {
    licenseplate: ''
  },
  location: '/'

}
