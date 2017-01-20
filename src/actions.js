//@flow
import type {Action, Driver, Car} from './model'

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

export const submitCarForm = (payload: Car):Action =>
  ({type: 'SUBMIT_CAR_FORM', payload})

export const confirmTestDrive = ():Action => ({type: 'CONFIRM_TEST_DRIVE'})
export const confirmTestDriveSuccess = ():Action => ({type: 'CONFIRM_TEST_DRIVE_SUCCESS'})

export const submitCarFormSuccess = {type: 'SUBMIT_CAR_FORM_SUCCESS'}

export const submitDriverFormSuccess = {type: 'SUBMIT_DRIVER_FORM_SUCCESS'}
