//@flow
import type {ActionHandler, Model} from '../model'
import {emptyTestdrive} from '../model'
import {cmd} from '../start-app'
import {submitTestdrive, historyPush, setLocalStorage} from '../effects'
const handler:ActionHandler = {
  CONFIRM_TEST_DRIVE: (state) => {
    const testdrive = {...state.testdrive, concent: state.concentForm}
    return cmd({...state, testdrive}, submitTestdrive(testdrive))
  },

  CONFIRM_TEST_DRIVE_SUCCESS: (state, testdrive) =>
    cmd({...state,
      testdrive: emptyTestdrive,
      testdriveList: [...state.testdriveList, testdrive],
      driverForm: emptyTestdrive.driver,
      carForm: emptyTestdrive.car,
      concentForm: emptyTestdrive.concent
    },
    setLocalStorage('testdrive')(emptyTestdrive),
    historyPush('/')
  )

}
export default handler
