//@flow
import type {Action, Testdrive} from '../model'
export const driversLicenseCaptured = (payload: any[]) =>
({type: 'DRIVERS_LICENSE_CAPTURED', payload})

export const driversLicenseUploadSuccess = (payload: any) =>
({type: 'DRIVERS_LICENSE_UPLOAD_SUCCESS', payload})

export const driversLicenseUploadFail = (payload: any) =>
({type: 'DRIVERS_LICENSE_UPLOAD_FAIL', payload})

export const newTestdrive:Action = {type: 'NEW_TESTDRIVE'}

export const confirmTestdrive = {type: 'CONFIRM_TEST_DRIVE'}

export const confirmTestdriveSuccess = (payload:Testdrive):Action => ({type: 'CONFIRM_TEST_DRIVE_SUCCESS', payload})

export const confirmTestdriveFail = ():Action => ({type: 'CONFIRM_TEST_DRIVE_FAIL'})
