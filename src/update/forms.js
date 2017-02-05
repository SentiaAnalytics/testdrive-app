//@flow
import {cmd} from '../start-app'
import type {Msg, Model, Dict, Driver, Testdrive} from '../model'
import {contains, assocPath} from '../util'
import * as task from '../tasks'

const saveTestDrive = (testdrive:Testdrive) => task.setLocalStorage('testdrive')(testdrive)

export default {
  setFormField: (state:Model, form:string, field:string, value:any) =>
      [assocPath([form, field])(value)(state)],

  submitDriverForm: (state:Model, driver:Driver, msg:Msg) => {
    const testdrive = {...state.testdrive, driver}
    return [
      {...state, testdrive},
      task.all([
        saveTestDrive(testdrive),
        task.call(msg.historyPush, '/new/brand')
      ])
    ]
  },

  submitCarBrand: (state:Model, brand:string, msg:Msg) => {
    const testdrive = assocPath(['car', 'brand'])(brand)(state.testdrive)
    const brands = contains(brand)(state.brands) ? state.brands : [...state.brands, brand]
    return [
      {...state, testdrive, brands},
      task.all([
        saveTestDrive(testdrive),
        task.setLocalStorage('brands')(brands),
        task.call(msg.historyPush, '/new/model')
      ])
    ]
  },
  submitCarModel: (state:Model, model:string, msg:Msg) => {
    const testdrive = assocPath(['car', 'model'])(model)(state.testdrive)
    const models = contains(model)(state.models) ? state.models :  [...state.models, model]
    return [
      {...state, testdrive, models},
      task.all([
        saveTestDrive(testdrive),
        task.setLocalStorage('models')(models),
        task.call(msg.historyPush, '/new/licenseplate')
      ])
    ]
  },
  submitCarLicenseplate: (state:Model, licenseplate:string, msg:Msg) => {
    const testdrive = assocPath(['car', 'licenseplate'])(licenseplate)(state.testdrive)
    const licenseplates = contains(licenseplate)(state.licenseplates) ? state.licenseplates : [...state.licenseplates, licenseplate]
    return [
      {...state, testdrive, licenseplates},
      task.all([
        saveTestDrive(testdrive),
        task.setLocalStorage('licenseplates')(licenseplates),
        task.call(msg.historyPush, '/new/confirm')
      ])
    ]
  }
}
