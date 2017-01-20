//@flow
import {startApp} from  './start-app'
import view from './view'
import update from './update'
import {emptyModel} from './model'
import Either from 'data.either'


const getInitialModel = Either.try(key => {
  const testdrive = JSON.parse(localStorage.getItem(key) || '')
  return testdrive ? {...emptyModel, testdrive, carForm: testdrive.car, driverForm: testdrive.driver} : emptyModel
})


getInitialModel('testdrive').fold(console.error, console.log)

const initialModel = getInitialModel('testdrive').fold(() => emptyModel, x => x)

startApp({
  view,
  model: initialModel,
  update,
})
