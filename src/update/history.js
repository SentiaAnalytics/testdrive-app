//@flow
import type {Model, Loc, Dict, Msg} from '../model'
import * as task from '../tasks'
import {zip, all, find, compose, split, mapObj, map} from '../util'

type Route = {
  path:string,
  handler:Function
}

const route = (path, handler):Route => ({path, handler})
const matchRoute = (path:string) =>
  compose(all(([a, b]) => b[0] === ':' || a === b), zip(path.split('/')), split('/'))

const buildParams = (route, path) =>
  zip(route.split('/'))(path.split('/'))
    .reduce((o, [k, v]) => k[0] === ':' ? {...o, [k.slice(1)]: v} : o, {})

const parseQuery = compose(mapObj(decodeURIComponent), map(split('=')), split('='))

const router = (routes:Dict) => (state:Model, location:Location, msg:Msg) => {
    const query = parseQuery(location.hash || location.search)
    const route = find(matchRoute(location.pathname))(Object.keys(routes))
    if (!route) {
      return routes.default(state, {pathname:location.pathname, query, params:{}}, msg)
    }
    const params = buildParams(route, location.pathname)
    return routes[route](state, {pathname:route, query, params}, msg)
}

const routes = {
  '/': (state, location, msg) => {
    console.log('loc', location.pathname)
    return [
      {...state, location},
      task.getTestdriveList
    ]
  },
  '/new/:driver': (state, location, msg) =>{
    console.log('new driver!')
    return [{...state, location}]
  },
  'default': (state, location, msg) =>
    [{...state, location}]
}

export default {
  locationUpdate : (state:Model, location:Location, msg:Msg) => {
    if (location !== '/login' && state.user.status !== 'SUCCESS') {
      return [state, task.historyReplace('/login')]
    }
    return router(routes)(state, location, msg)
  }
}
