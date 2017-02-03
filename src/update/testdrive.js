//@flow
import type {ActionHandler, Model} from '../model'
import {emptyTestdrive} from '../model'
import {cmd} from '../start-app'
import * as eff from '../effects'
import {assocPath} from '../util'
import {showToast} from '../actions'
import Task from 'data.task'

const resetTestdrive = (state) => (
  {...state,
    testdrive: emptyTestdrive,
    driverForm: emptyTestdrive.driver,
    carForm: emptyTestdrive.car,
    concentForm: emptyTestdrive.concent
  })

const handler:ActionHandler = {
  NEW_TESTDRIVE: (state) =>
    cmd(
      resetTestdrive(state),
      eff.setLocalStorage('testdrive')(emptyTestdrive),
      eff.historyPush('/new/driver')
    ),

  DRIVERS_LICENSE_CAPTURED: (state, files) =>
    cmd(
      assocPath(['testdrive', 'driver', 'licenseURL', 'status'])('PENDING')(state),
        eff.uploadDriversLicense(files[0])
     ),

  DRIVERS_LICENSE_UPLOAD_SUCCESS: (state, licenseURL) => {
    const data = {value: licenseURL, status: 'SUCCESS'}
    return assocPath(['testdrive', 'driver', 'licenseURL'])(data)(state)
  },
  DRIVERS_LICENSE_UPLOAD_FAIL: (state, err) => {
    const data = {status: 'FAIL'}
    return cmd(
      assocPath(['testdrive', 'driver', 'licenseURL'])(data)(state),
      eff.toastDanger(err)
    )
  },

  CONFIRM_TEST_DRIVE: (state) => {
    const testdrive = {
      ...state.testdrive,
      concent: state.concentForm
    }
    return cmd({...state, testdrive}, eff.submitTestdrive(testdrive))
  },

  CONFIRM_TEST_DRIVE_SUCCESS: (state, testdrive) =>
    cmd({
      ...resetTestdrive(state),
      testdriveList: [...state.testdriveList, testdrive]
    },
    eff.setLocalStorage('testdrive')(emptyTestdrive),
    eff.historyPush('/')
  ),
  CONFIRM_TEST_DRIVE_FAIL: (state, err) =>
    cmd(state,
    eff.toastDanger(err)
  )
}
export default handler
