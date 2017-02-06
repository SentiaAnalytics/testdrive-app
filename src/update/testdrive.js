//@flow
import type {Testdrive,  Model, Msg} from '../model'
import {emptyTestdrive} from '../model'
import {cmd} from '../start-app'
import {assocPath, indexBy} from '../util'
import * as task from '../tasks'


const resetTestdrive = (state) => (
  {...state,
    testdrive: emptyTestdrive,
    driverForm: emptyTestdrive.driver,
    carForm: emptyTestdrive.car,
    consentForm: emptyTestdrive.consent,
    testdriveStatus: 'NONE'
  })

export default {
  getTestdriveListFail: (state:Model, err:string, msg:Msg) =>
    [
      {...state, testdrivesList: {status:'FAIL'}},
      task.call(msg.toastDanger, err)
    ],
  getTestdriveListSuccess: (state:Model, testdrives:Testdrive[], msg:Msg) =>
    [ {...state, testdriveList: {status:'SUCCESS', value:indexBy(x => x.id)(testdrives)}} ],
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
      {...state, testdrive, testdriveStatus: 'PENDING'},
      task.submitTestdrive(testdrive)
        .fold(msg.confirmTestdriveFail, msg.confirmTestdriveSuccess)
    ]
  },

  confirmTestdriveSuccess: (state:Model, testdrive:Testdrive, msg:Msg) =>
    [
      {
        ...resetTestdrive(state),
        testdriveStatus: 'SUCCESS',
        testDriveList : assocPath(['value', testdrive.id])(testdrive)(state.testdriveList)
      },
      task.all([
        task.setLocalStorage('testdrive')(emptyTestdrive),
        task.historyPush('/')
      ])
    ],
  confirmTestdriveFail: (state:Model, err:any, msg:Msg) =>
    [
      {
        ...state,
        testdriveStatus: 'FAIL'
      },
      task.call(msg.httpError, err)
    ]
}
