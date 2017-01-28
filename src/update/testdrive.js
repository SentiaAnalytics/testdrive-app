//@flow
import type {ActionHandler, Model} from '../model'
import {emptyTestdrive} from '../model'
import {cmd} from '../start-app'
import * as eff from '../effects'

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
    cmd(state, eff.uploadDriversLicense(files[0])),

  CONFIRM_TEST_DRIVE: (state) => {
    const testdrive = {...state.testdrive, concent: state.concentForm}
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
