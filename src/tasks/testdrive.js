//@flow
import Task from 'data.task'
import type {Testdrive} from '../model'
import * as http from '../http'
import {evolve, compressImage} from '../util'

const log = key => value => (console.log(key, value), value)

const testdrivePayload = (testdrive:Testdrive) =>
  log('testdrive')(
    evolve({
      driver: {licenceUrl: x => x.value}
    })(testdrive)
  )

export const submitTestdrive = (testdrive:Testdrive) =>
  http.put('/api/userid')(testdrivePayload(testdrive))

const createForm = (key:string) => (data:any) => {
  const form = new FormData()
  form.append(key, data)
  return form
}

export const uploadDriversLicense = (file:File) =>
  compressImage(file, {resolution: 1080})
    .map(createForm('license'))
    .chain(http.post('/api/ncg/userid'))
