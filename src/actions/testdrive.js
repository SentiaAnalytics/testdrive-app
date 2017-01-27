//@flow
import type {Action, Testdrive} from '../model'

export const newTestdrive:Action = {type: 'NEW_TESTDRIVE'}

export const confirmTestdrive = {type: 'CONFIRM_TEST_DRIVE'}

export const confirmTestdriveSuccess = (payload:Testdrive):Action => ({type: 'CONFIRM_TEST_DRIVE_SUCCESS', payload})

export const confirmTestdriveFail = ():Action => ({type: 'CONFIRM_TEST_DRIVE_FAIL'})
