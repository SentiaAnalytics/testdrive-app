//@flow
import {startApp} from  './start-app'
import view from './view'
import update from './update'
import {emptyModel} from './model'
import Either from 'data.either'
import Maybe from 'data.maybe'
import {historyReplace, historyPop, noop} from './actions'
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
  concetForm: def => getFromLocalStorage('testdrive')
    .map(x => x.concent)
    .getOrElse(def),
  brands: def => getFromLocalStorage('brands')
    .getOrElse(def),
  models: def => getFromLocalStorage('models')
    .getOrElse(def),
  user: def => getCookie('jwt')
    .chain(compose(Maybe.fromEither, getJWTBody))
    .getOrElse(def)
}

const initialModel = evolve(cachedData)(emptyModel)

const store = startApp({
  view,
  model: initialModel,
  update,
})

store.dispatch(historyReplace(history.location))

history.listen((location, type) => {
  if (type === 'POP') {
    store.dispatch(historyPop(location))
  }
})
