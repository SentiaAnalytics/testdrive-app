//@flow
import Task from 'data.task'
import type {Testdrive} from '../model'
import * as http from '../http'
import {evolve, compressImage, omit} from '../util'

const log = key => value => (console.log(key, value), value)

export const getTestdriveList = http.get('/api/testdrives')

const testdrivePayload = (testdrive:Testdrive) =>
  evolve({
    licenseUrl: x => x.value,
    base64Signature: x => x.value
  })(Object.assign(omit(['driver'])(testdrive), testdrive.driver.value))

export const submitTestdrive = (testdriveForm:Testdrive) =>
  http.post('/api/testdrives')(log('testdriveRequest')(testdrivePayload(log('testdriveForm')(testdriveForm))))


const createForm = (key:string) => (data:any) => {
  const form = new FormData()
  form.append(key, data)
  return form
}

export const uploadDriversLicense = (file:File) =>
  compressImage(file, {resolution: 1080})
    .map(createForm('license'))
    .chain(http.post('/api/ncg/userid'))

export const cprLookUp = (cpr: string) =>
  http.get(`/api/pnr/${cpr}`)
    .bimap(x => x.response.data.errorDetails, x => x)
    .bimap(log('cpr_fail'), log('cpr_success'))
