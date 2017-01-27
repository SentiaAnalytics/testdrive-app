//@flow
import type {ActionHandler, Model} from '../model'
import {emptyTestdrive} from '../model'
import {cmd} from '../start-app'
import {submitTestdrive, historyPush, setLocalStorage} from '../effects'
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
      setLocalStorage('testdrive')(emptyTestdrive),
      historyPush('/new/driver')
    ),

  CONFIRM_TEST_DRIVE: (state) => {
    const testdrive = {...state.testdrive, concent: state.concentForm}
    return cmd({...state, testdrive}, submitTestdrive(testdrive))
  },

  CONFIRM_TEST_DRIVE_SUCCESS: (state, testdrive) =>
    cmd({
      ...resetTestdrive(state),
      testdriveList: [...state.testdriveList, testdrive]
    },
    setLocalStorage('testdrive')(emptyTestdrive),
    historyPush('/')
  )

}
export default handler
