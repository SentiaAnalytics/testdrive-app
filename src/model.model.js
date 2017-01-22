  //@flow

export type Dict = { [string]: any }
export type Dispatch = (a:Action) => void

export type ActionType = 'NO_OP'
  | 'SET_TITLE'
  | 'SET_TITLE_ASYNC'
  | 'OPEN_MODAL'
  | 'HISTORY_PUSH'
  | 'HISTORY_REPLACE'
  | 'SET_FORM_FIELD'
  | 'SUBMIT_DRIVER_FORM'
  | 'SUBMIT_DRIVER_FORM_SUCCESS'
  | 'SUBMIT_CAR_FORM'
  | 'SUBMIT_CAR_FORM_SUCCESS'
  | 'CONFIRM_TEST_DRIVE'
  | 'CONFIRM_TEST_DRIVE_SUCCESS'
  | 'CONFIRM_TEST_DRIVE_FAIL'
  | 'SET_SIGNATURE'

export type Action = {
  type: ActionType,
  payload?: any
}

export type Driver = {
  cpr: string,
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
  cpr: '',
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

export type Concent = {
  base64Signature:string
}

export const emptyConcent:Concent = {
  base64Signature: ''
}

export type Testdrive = {
  id: string,
  driver: Driver,
  car: Car,
  concent: Concent
}

export const emptyTestdrive:Testdrive = {
  id: '',
  driver: emptyDriver,
  car: emptyCar,
  concent: emptyConcent
}



export type Model = {
  modals: { [string]: bool },
  driverForm: Driver,
  carForm: Car,
  concentForm: Concent,
  testdrive: Testdrive,
  testdriveList: Testdrive[],
  location: string
}

export const emptyModel:Model = {
  modals: {
    signature: false
  },
  driverForm: emptyDriver,
  carForm: emptyCar,
  concentForm: emptyConcent,
  testdrive: emptyTestdrive,
  testdriveList: [],
  licenseplateForm: {
    licenseplate: ''
  },
  location: '/'

}
