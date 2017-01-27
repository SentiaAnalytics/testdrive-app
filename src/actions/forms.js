//@flow
import type {Action, Driver, Testdrive} from '../model'

export const setFormField = (form:string) => (field:string) => (value:string):Action => ({
  type: 'SET_FORM_FIELD',
  payload: {form, field, value}
})

export const submitDriverForm = (payload: Driver):Action =>
  ({type: 'SUBMIT_DRIVER_FORM', payload})

export const submitCarBrand = (payload: string):Action =>
  ({type: 'SUBMIT_CAR_BRAND', payload})

export const submitCarModel = (payload: string):Action =>
  ({type: 'SUBMIT_CAR_MODEL', payload})

export const submitCarLicenseplate = (payload: string):Action =>
  ({type: 'SUBMIT_CAR_LICENSEPLATE', payload})


export const submitCarFormSuccess = {type: 'SUBMIT_CAR_FORM_SUCCESS'}

export const submitDriverFormSuccess = (payload:Testdrive) => ({type: 'SUBMIT_DRIVER_FORM_SUCCESS', payload})
