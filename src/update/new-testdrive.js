//@flow
import type {Testdrive,  Model, Msg} from '../model'
import {emptyTestdriveForm, emptySearch} from '../model'
import {assocPath, indexBy} from '../util'
import * as task from '../tasks'

const resetTestdrive = (state) => (
  {...state,
    testdriveForm: {
      status: 'NONE',
      value: emptyTestdriveForm
    },
    search: emptySearch,
  })

export default {
  setCarBrand: (state:Model, carBrand:string) => [
    assocPath(['testdriveForm', 'value', 'carBrand'])(carBrand)(state),
    task.historyPush('/new/5')
  ],
  setCarModel: (state:Model, carModel:string) => [
    assocPath(['testdriveForm', 'value', 'carModel'])(carModel)(state),
    task.historyPush('/new/6')
  ],
  setCarLicenseplate: (state:Model, licenseplate:string) => [
    assocPath(['testdriveForm', 'value', 'licenseplate'])(licenseplate)(state),
    task.historyPush('/new/7')
  ],
  newTestdrive: (state:Model, msg:Msg) =>
    [
      resetTestdrive(state),
      task.all([
        task.setLocalStorage('testdrive')(emptyTestdriveForm),
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
        task.setLocalStorage('testdrive')(emptyTestdriveForm),
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
