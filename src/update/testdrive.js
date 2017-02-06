//@flow
import type {Testdrive,  Model, Msg} from '../model'
import {emptyTestdrive} from '../model'
import {cmd} from '../start-app'
import {assocPath} from '../util'
import * as task from '../tasks'


const resetTestdrive = (state) => (
  {...state,
    testdrive: emptyTestdrive,
    driverForm: emptyTestdrive.driver,
    carForm: emptyTestdrive.car,
    consentForm: emptyTestdrive.consent
  })

export default {
  newTestdrive: (state:Model, msg:Msg) =>
    [
      resetTestdrive(state),
      task.all([
        task.setLocalStorage('testdrive')(emptyTestdrive),
        task.historyPush('/new/driver')
      ])
    ],

  driversLicenseCaptured: (state:Model, files:File[], msg:Msg) =>
    [
      assocPath(['testdrive', 'driver', 'licenseURL', 'status'])('PENDING')(state),
      task.uploadDriversLicense(files[0])
        .fold(msg.uploadDriversLicenseFail, msg.uploadDriversLicenseSuccess)
    ],

  uploadDriversLicenseSuccess: (state:Model, licenseURL:string) => {
    const data = {value: licenseURL, status: 'SUCCESS'}
    return [assocPath(['testdrive', 'driver', 'licenseURL'])(data)(state)]
  },

  uploadDriversLicenseFail: (state:Model, err:any, msg:Msg) => {
    const data = {status: 'FAIL'}
    return [
      assocPath(['testdrive', 'driver', 'licenseURL'])(data)(state),
      task.call(msg.toastDanger, err)
    ]
  },

  confirmTestdrive: (state:Model, msg:Msg) => {
    const testdrive = {
      ...state.testdrive,
      consent: state.consentForm
    }
    return [
      {...state, testdrive},
      task.submitTestdrive(testdrive)
        .fold(msg.confirmTestdriveFail, msg.confirmTestdriveSuccess)
    ]
  },

  confirmTestdriveSuccess: (state:Model, testdrive:Testdrive, msg:Msg) =>
    [
      {
        ...resetTestdrive(state),
        testdriveList: [...state.testdriveList, testdrive]
      },
      task.all([
        task.setLocalStorage('testdrive')(emptyTestdrive),
        task.historyPush('/')
      ])
    ],
  confirmTestdriveFail: (state:Model, err:any, msg:Msg) =>
    [
      state,
      task.call(msg.toastDanger, err)
    ]
}
