//@flow
import {startApp} from  './start-app'
import view from './view'
import update from './update'
import {emptyModel} from './model'
import Either from 'data.either'


const getInitialModel = Either.try(keys => {
  const model = keys.reduce((acc, key) => {
    acc[key] = JSON.parse(localStorage.getItem(key) || '[]')
    return acc
  }, {})
  const { testdrive, brands, models } = model
  return testdrive ? {...emptyModel, testdrive, carForm: testdrive.car, driverForm: testdrive.driver, brands, models} : emptyModel
})


getInitialModel(['testdrive', 'brands', 'models']).fold(console.error, console.log)

const initialModel = getInitialModel(['testdrive', 'brands', 'models']).fold(() => emptyModel, x => x)

startApp({
  view,
  model: initialModel,
  update,
})
