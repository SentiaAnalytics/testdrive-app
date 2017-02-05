//@flow
import app from  'oolon-startapp'
import view from './view'
import update from './update'
import {emptyModel} from './model'
import Either from 'data.either'
import Maybe from 'data.maybe'
import history from './history'
import {compose, getFromLocalStorage, getCookie, evolve, getJWTBody} from './util'

const cachedData = {
  testdrive: def => getFromLocalStorage('testdrive').getOrElse(def),
  carForm: def => getFromLocalStorage('testdrive')
    .map(x => x.car)
    .getOrElse(def),
  driverForm: def => getFromLocalStorage('testdrive')
    .map(x => x.driver)
    .getOrElse(def),
  consentForm: def => getFromLocalStorage('testdrive')
    .map(x => x.consent)
    .getOrElse(def),
  brands: def => getFromLocalStorage('brands')
    .getOrElse(def),
  models: def => getFromLocalStorage('models')
    .getOrElse(def),
  licenseplates: def => getFromLocalStorage('licenseplates')
    .getOrElse(def)
}

const initialModel = evolve(cachedData)(emptyModel)

app({
  view,
  model: initialModel,
  update,
  subs: [
    (_, msg) => history.listen((location, type) => type === 'POP' ? msg.historyPop(location) : null),
    (_, msg) => msg.init()
  ],
  hooks: {
    onAction: (name, ...args) =>
      console.log("[Action] %c%s", "color: blue", name, ...args),
    onUpdate: (last, model) =>
      console.log(model)
  }
})
