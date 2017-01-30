//@flow
import type {ActionHandler, Model} from '../model'
import {emptyTestdrive} from '../model'
import {cmd} from '../start-app'
import * as eff from '../effects'
import {assocPath} from '../util'

const resetTestdrive = (state) => (
  {...state,
    testdrive: {
      ...emptyTestdrive,
      user: state.user.email,
      dealership: state.user.dealership
    },
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
    cmd(state, eff.uploadDriversLicense(files[0])),

  DRIVERS_LICENSE_UPLOAD_SUCCESS: (state, licenseURL) =>
    assocPath(['testdrive', 'driver', 'licenseURL'])(licenseURL)(state),

  CONFIRM_TEST_DRIVE: (state) => {
    const testdrive = {
      ...state.testdrive,
      concent: state.concentForm,
      date: new Date().toUTCString()
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
  )

}
export default handler
