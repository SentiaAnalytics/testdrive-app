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

export default {
  goBack: (state:Model) =>
    [state, task.historyPop],
  locationUpdate : (state:Model, location:Location, msg:Msg) => {
    if (location.pathname !== '/login' && state.user.status !== 'SUCCESS') {
      return [state, task.historyReplace('/login')]
    }
    const routehandler = router({
      '/': (state, location, msg) =>
        [
          {...state, location, testdriveList:{status: 'PENDING'}},
          task.getTestdriveList.fold(msg.getTestdriveListFail, msg.getTestdriveListSuccess)
        ],
      '/testdrives/:testdriveId' : (state, location) => {
        const newState =  {...state, location}
        if (state.testdriveList.status === 'SUCCESS') {
          return [newState]
        }
        return [
          newState,
          task.getTestdriveList
            .fold(msg.httpError, msg.getTestdriveListSuccess)
        ]
      },
      '/new/:page': (state, location) =>
        [{...state, location}],
      'default': (state, location, msg) =>
        [{...state, location}]
    })
    return routehandler(state, location, msg)
  }
}
