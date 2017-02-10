//@flow
import type {Testdrive,  Model, Msg} from '../model'
import {emptyTestdriveRequest, emptyDriverForm, emptyConsentForm, emptyCprForm} from '../model'
import {cmd} from '../start-app'
import {assocPath, indexBy} from '../util'
import * as task from '../tasks'


const resetTestdrive = (state) => (
  {...state,
    testdriveRequest: emptyTestdriveRequest,
    cprForm: emptyCprForm,
    driverForm: emptyDriverForm,
    consentForm: emptyConsentForm,
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
        task.setLocalStorage('testdrive')(emptyTestdriveRequest),
        task.historyPush('/new/0')
      ])
    ],

  driversLicenseCaptured: (state:Model, files:File[], msg:Msg) =>
    [
      assocPath(['testdriveRequest','licenseUrl', 'status'])('PENDING')(state),
      task.uploadDriversLicense(files[0])
        .fold(msg.uploadDriversLicenseFail, msg.uploadDriversLicenseSuccess)
    ],

  uploadDriversLicenseSuccess: (state:Model, licenseUrl:string) => {
    const data = {value: licenseUrl, status: 'SUCCESS'}
    return [
      assocPath(['testdriveRequest', 'licenseUrl'])(data)(state),
      task.historyPush('/new/1')
    ]
  },

  uploadDriversLicenseFail: (state:Model, err:any, msg:Msg) => {
    const data = {status: 'FAIL'}
    return [
      assocPath(['testdriveRequest', 'licenseUrl'])(data)(state),
      task.call(msg.toastDanger, err)
    ]
  },

  confirmTestdrive: (state:Model, msg:Msg) => {
    const testdriveRequest = {
      ...state.testdriveRequest,
      consent: state.consentForm
    }
    return [
      {...state, testdriveRequest, testdriveStatus: 'PENDING'},
      task.submitTestdrive(testdriveRequest)
        .fold(msg.confirmTestdriveFail, msg.confirmTestdriveSuccess)
    ]
  },

  confirmTestdriveSuccess: (state:Model, testdrive:Testdrive, msg:Msg) =>
    [
      {
        ...resetTestdrive(state),
        testdriveStatus: 'SUCCESS'
      },
      task.all([
        task.setLocalStorage('testdrive')(emptyTestdriveRequest),
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
