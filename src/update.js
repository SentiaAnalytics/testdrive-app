//@flow
import Task from 'data.task'
import {noop, submitCarFormSuccess, submitDriverFormSuccess, confirmTestdriveSuccess} from './actions'
import {cmd} from './start-app'
import type {Model, Action, ActionType} from './model'
import {emptyTestdrive} from './model'
import {historyPush, historyReplace, setLocalStorage, submitTestdrive} from './effects'
import {evolve, apply, assocPath, map} from './util'

const saveTestDrive = setLocalStorage('testdrive')
const taskOf = (action:Action) =>
  new Task((reject, resolve) => setTimeout(() => resolve(action), 0))

type ReducerMap = {[ActionType]: Function}

const reducers:ReducerMap = {
  HISTORY_PUSH: (state, url) => cmd(state, historyPush(url || '/')),

  HISTORY_REPLACE: (state, url) => cmd(state, historyReplace(url || '/')),

  SET_FORM_FIELD: (state, {form, field, value}) =>
      apply(assocPath, [form, field], value, state),

  OPEN_MODAL: (state, modal) => evolve({modals: {[modal]: () => true}})(state),

  SUBMIT_DRIVER_FORM: (state, driver) => {
    const testdrive = {...state.testdrive, driver}
    return cmd(
      {...state, testdrive},
      saveTestDrive(testdrive),
      historyPush('/car')
    )
  },

  SUBMIT_CAR_FORM: (state, car) => {
    const testdrive = {...state.testdrive, car}
    return cmd(
      {...state, testdrive},
      saveTestDrive(testdrive),
      historyPush('/confirm')
    )
  },

  SUBMIT_CAR_FORM_SUCCESS: (state) => cmd(state, historyPush('/confirm')),

  SET_SIGNATURE: (state, base64Signature) =>
    evolve({
    concentForm: { base64Signature: () => base64Signature },
    modals: { signature: () => false }
  })(state),

  CONFIRM_TEST_DRIVE: (state) => {
    const testdrive = {...state.testdrive, concent: state.concentForm}
    return cmd({...state, testdrive}, submitTestdrive(testdrive))
  },

  CONFIRM_TEST_DRIVE_SUCCESS: (state, testdrive) => cmd(
    {...state,
      testdrive: emptyTestdrive,
      testdriveList: [...state.testdriveList, testdrive],
      driverForm: emptyTestdrive.driver,
      carForm: emptyTestdrive.car,
      concentForm: emptyTestdrive.concent
    },
    saveTestDrive(emptyTestdrive),
    historyPush('/')
  )
}

export default (state: Model, action:Action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action.payload)
  }
  return state
}
