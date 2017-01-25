//@flow

export type Concent = {
  base64Signature:string
}

export const emptyConcent:Concent = {
  base64Signature: ''
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
