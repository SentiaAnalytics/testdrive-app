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
  licenseURL: string,
}

export const emptyDriver:Driver = {
  cpr: '',
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  licenseURL: ''
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
  user: string,
  date: string,
  dealership: string,
  driver: Driver,
  car: Car,
  concent: Concent
}

export const emptyTestdrive:Testdrive = {
  id: '',
  user: '',
  dealership: '',
  date: '',
  driver: emptyDriver,
  car: emptyCar,
  concent: emptyConcent
}
