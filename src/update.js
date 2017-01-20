//@flow
import Task from 'data.task'
import {noop, submitCarFormSuccess, submitDriverFormSuccess, confirmTestDriveSuccess} from './actions'
import {cmd} from './start-app'
import type {Model, Action, ActionType} from './model'
import {emptyTestdrive} from './model'
import {historyPush, historyReplace, setLocalStorage} from './effects'
import {apply, assocPath, map} from './util'

const saveTestDrive = setLocalStorage('testdrive')
const taskOf = (action:Action) =>
  new Task((reject, resolve) => setTimeout(() => resolve(action), 0))

type ReducerMap = {[ActionType]: Function}

const reducers:ReducerMap = {
  HISTORY_PUSH: (state, url) => cmd(state, historyPush(url || '/')),
  HISTORY_REPLACE: (state, url) => cmd(state, historyReplace(url || '/')),
  SET_FORM_FIELD: (state, {form, field, value}) => {
    return apply(assocPath, [form, field], value, state)
  },
  SUBMIT_DRIVER_FORM: (state, driver) => {
    const testdrive = {...state.testdrive, driver}
    return cmd(
      {...state, testdrive},
      map(_ => submitDriverFormSuccess)(saveTestDrive(testdrive))
    )
  },
  SUBMIT_DRIVER_FORM_SUCCESS: (state) => cmd(state, historyPush('/car')),
  SUBMIT_CAR_FORM: (state, car) => {
    const testdrive = {...state.testdrive, car}
    return cmd(
      {...state, testdrive},
      map(_ => submitCarFormSuccess)(saveTestDrive(testdrive))
    )
  },
  SUBMIT_CAR_FORM_SUCCESS: (state) => cmd(state, historyPush('/confirm')),
  CONFIRM_TEST_DRIVE: (state) => cmd(state, taskOf(confirmTestDriveSuccess())),
  CONFIRM_TEST_DRIVE_SUCCESS: (state) => cmd(
    {...state,
      testdrive: emptyTestdrive ,
      driverForm: emptyTestdrive.driver,
      carForm: emptyTestdrive.car
    },
    saveTestDrive(emptyTestdrive),
    historyPush('/driver')
  )
}

export default (state: Model, action:Action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action.payload)
  }
  return state
}
