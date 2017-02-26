//@flow
import type {Msg, Model, Dict, Driver, Testdrive} from '../model'
import {contains, assocPath, assoc} from '../util'
import * as task from '../tasks'

const saveTestDrive = (testdrive:Testdrive) => task.setLocalStorage('testdrive')(testdrive)

export default {
  setFormField: (state:Model, form:string, field:string, value:any) =>
      [assocPath([form, field])(value)(state)],

  submitCprForm: (state:Model, cpr:number, msg:Msg) =>
    [
      {
        ...state,
        testdriveRequest: assoc('cpr')(cpr)(state.testdriveRequest),
        cprStatus: 'PENDING'
      },
      task.cprLookUp(String(cpr))
        .fold(msg.cprLookUpFail, msg.cprLookUpSuccess)
    ],

  submitDriverForm: (state:Model, driver:Driver, msg:Msg) => {
    const testdriveRequest = {...state.testdriveRequest, ...driver}
    return [
      {...state, testdriveRequest},
      task.all([
        saveTestDrive(testdriveRequest),
        task.historyPush('/new/3')
      ])
    ]
  },

  submitCarBrand: (state:Model, carBrand:string, msg:Msg) => {
    const testdriveRequest = {
      ...state.testdriveRequest,
      carBrand
    }
    const brands = contains(carBrand)(state.brands) ? state.brands : [...state.brands, carBrand]
    return [
      {...state, testdriveRequest, brands},
      task.all([
        saveTestDrive(testdriveRequest),
        task.setLocalStorage('brands')(brands),
        task.historyPush('/new/4')
      ])
    ]
  },
  submitCarModel: (state:Model, carModel:string, msg:Msg) => {
    const {carBrand} = state.testdriveRequest
    const testdriveRequest = {
      ...state.testdriveRequest,
      carModel
    }
    const models = !state.models[carBrand] ? { ...state.models, [carBrand]: [carModel] } :
      contains(carModel)(state.models[carBrand]) ?  state.models :
      {...state.models, [carBrand]: [...state.models[carBrand], carModel] }

    return [
      {...state, testdriveRequest, models},
      task.all([
        saveTestDrive(testdriveRequest),
        task.setLocalStorage('models')(models),
        task.historyPush('/new/5')
      ])
    ]
  },
  submitCarLicenseplate: (state:Model, licenseplate:string, msg:Msg) => {
    const testdriveRequest = {
      ...state.testdriveRequest,
      licenseplate
    }
    const licenseplates = contains(licenseplate)(state.licenseplates) ? state.licenseplates : [...state.licenseplates, licenseplate]
    return [
      {...state, testdriveRequest, licenseplates},
      task.all([
        saveTestDrive(testdriveRequest),
        task.setLocalStorage('licenseplates')(licenseplates),
        task.historyPush('/new/6')
      ])
    ]
  }
}
