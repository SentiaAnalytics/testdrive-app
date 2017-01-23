//@flow
import type {Action, Driver, Car, Testdrive} from './model'

export const noop = {type: 'NO_OP'}
export const setFormField = (form:string) => (field:string) => (value:string):Action => ({
  type: 'SET_FORM_FIELD',
  payload: {form, field, value}
})

export const historyPush = (payload:string):Action => ({
    type: 'HISTORY_PUSH',
    payload
})

export const historyReplace = (payload:string):Action => ({
    type: 'HISTORY_REPLACE',
    payload
})
export const submitDriverForm = (payload: Driver):Action =>
  ({type: 'SUBMIT_DRIVER_FORM', payload})

export const submitCarBrand = (payload: string):Action =>
  ({type: 'SUBMIT_CAR_BRAND', payload})

export const submitCarModel = (payload: string):Action =>
  ({type: 'SUBMIT_CAR_MODEL', payload})

export const submitCarLicenseplate = (payload: string):Action =>
  ({type: 'SUBMIT_CAR_LICENSEPLATE', payload})

export const confirmTestdrive = {type: 'CONFIRM_TEST_DRIVE'}
export const confirmTestdriveSuccess = (payload:Testdrive):Action => ({type: 'CONFIRM_TEST_DRIVE_SUCCESS', payload})

export const confirmTestdriveFail = ():Action => ({type: 'CONFIRM_TEST_DRIVE_FAIL'})

export const submitCarFormSuccess = {type: 'SUBMIT_CAR_FORM_SUCCESS'}

export const submitDriverFormSuccess = (payload:Testdrive) => ({type: 'SUBMIT_DRIVER_FORM_SUCCESS', payload})

export const setSignature = (base64Signature: string):Action =>
  ({type: 'SET_SIGNATURE', payload: base64Signature})

export const openModal = (payload:string) => ({type : 'OPEN_MODAL', payload})
