//@flow


export type User = {
  email: string,
  firstname: string,
  lastname: string
}
export const emptyUser = {
  email: '',
  firstname: '',
  lastname: ''
}

export type Credentials = {
  email: string,
  password: string
}

export const emptyCredentials = {
  email: '',
  password: ''
}
