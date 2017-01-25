//@flow
import {historyPush, historyReplace, setLocalStorage} from '../effects'
import {cmd} from '../start-app'
import type {ActionHandler, Model, Dict, Driver} from '../model'
import {assocPath} from '../util'

const saveTestDrive = setLocalStorage('testdrive')

const handler:ActionHandler = {
  SET_FORM_FIELD: (state:Model, {form, field, value}:Dict) =>
      assocPath([form, field])(value)(state),

      SUBMIT_DRIVER_FORM: (state:Model, driver:Driver) => {
        const testdrive = {...state.testdrive, driver}
        return cmd(
          {...state, testdrive},
          saveTestDrive(testdrive),
          historyPush('/new/brand')
        )
      },

      SUBMIT_CAR_BRAND: (state:Model, brand:string) => {
        const testdrive = assocPath(['car', 'brand'])(brand)(state.testdrive)
        return cmd(
          {...state, testdrive},
          saveTestDrive(testdrive),
          historyPush('/new/model')
        )
      },
      SUBMIT_CAR_MODEL: (state:Model, model:string) => {
        const testdrive = assocPath(['car', 'model'])(model)(state.testdrive)
        return cmd(
          {...state, testdrive},
          saveTestDrive(testdrive),
          historyPush('/new/licenseplate')
        )
      },
      SUBMIT_CAR_LICENSEPLATE: (state:Model, licenseplate:string) => {
        const testdrive = assocPath(['car', 'licenseplate'])(licenseplate)(state.testdrive)
        return cmd(
          {...state, testdrive},
          saveTestDrive(testdrive),
          historyPush('/new/confirm')
        )
      },

}

export default handler
