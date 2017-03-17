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
    (_, msg) => msg.init(),
    (_, msg) => history.listen((location => msg.locationUpdate(location))
    )
  ],
  hooks: {
    onAction: (name, ...args) =>
      console.log("[Action] %c%s", "color: blue", name, ...args),
    onUpdate: (last, model) =>
      console.log("[Model]",  model)
  }
})
