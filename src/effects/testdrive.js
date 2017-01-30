//@flow
import Task from 'data.task'
import uuid from 'uuid/v4'
import type {Testdrive} from '../model'
import * as actions from '../actions'
import * as http from '../http'

export const submitTestdrive = (testdrive:Testdrive) =>
  http.put('/api/userid', testdrive)
    .fold(actions.confirmTestdriveFail, actions.confirmTestdriveSuccess)

const createForm = (key:string) => (data:any) => {
  const form = new FormData()
  form.append(key, data)
  return form
}


export const uploadDriversLicense = (file:File) =>
    http.post('/api/ncg/userid', createForm('licence')(file))
      .fold(actions.driversLicenseUploadFail, actions.driversLicenseUploadSuccess)
