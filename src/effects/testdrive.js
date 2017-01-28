//@flow
import Task from 'data.task'
import uuid from 'uuid/v4'
import type {Testdrive} from '../model'
import * as actions from '../actions'
import * as http from '../http'

export const submitTestdrive = (testdrive:Testdrive) =>
  Task.of(actions.confirmTestdriveSuccess({...testdrive, id: uuid()}))

export const uploadDriversLicense = (file:File) =>
    http.post('/ncg/userid', file)
      .fold(actions.driversLicenseUploadFail, actions.driversLicenseUploadSuccess)
