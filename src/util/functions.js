//@flow
import type {Dict} from '../model'
import Maybe from 'data.maybe'
import Either from 'data.either'
import cookie from 'cookie'

export const append = (x:any) => (xs:any[]) => [...xs, x]

export const any = (f:Function) => (xs:any[]) => xs.some(f)
export const contains = (y:any) => any(x => x === y)

export const map = (f:Function) => (x:any) => x.map(f)
export const filter = (f:Function) => (x:{filter:Function}) => x.filter(f)
export const reduce = (f:Function) => (init: any) => (x:{reduce:Function}) => x.reduce(f, init)
export const head = ([x]: any[]) => x
export const tail = ([x, ...xs]: any[]) => xs

export const chain = (f:Function) => (x:any) => x.chain(f)
export const merge = (a:Dict)=> (b:Dict) => Object.assign({}, a, b)


export const toPairs = (d:Dict) =>
  Object.keys(d).map(k => [k, d[k]])

export const compose = (...fs: Function[]) =>
  fs.reduce((g, f) => x => g(f(x)), x => x)

export const path = (ps:string[]) => (x:{[string]:any}) =>
  ps.reduce((obj, s) => obj && obj[s], x)

export const assoc = (key:string) => (value:any) => (x:{[string]:any}) =>
  ({...x, [key]: value})

export const apply = (f:Function, ...xs:any[]) =>
  xs.reduce((f, x) => f(x), f)

export const assocPath = ([x, ...xs]:string[]) => (val:any) => (dict:Dict) =>
  x === undefined ? val : {...dict, [x]: assocPath(xs)(val)(dict[x]) }

export const targetValue = path(['target', 'value'])
export const targetFiles = path(['target', 'files'])

export const preventDefault = (e:{preventDefault:Function}) => {
  e.preventDefault()
  return e
}

export const toLower = (x:string) => x.toLowerCase()
export const toUpper = (x:string) => x.toUpperCase()

export const evolve = (t:Dict) => (input:Dict) =>
  Object.keys(input).reduce((o, k) =>{
    switch(typeof t[k]) {
      case 'function':
        return {...o, [k]: t[k](input[k])}
      case 'object':
        return {...o, [k]: evolve(t[k])(input[k])}
      case 'undefined':
        return {...o, [k]: input[k]}
      default:
        return o
    }
  }, {})

export const getFromLocalStorage = (key:string) => {
  try {
    return Maybe.Just(JSON.parse(localStorage.getItem(key) || ''))
  } catch (e) {
    return Maybe.Nothing()
  }
}

export const getCookie = (name: string) =>
  Maybe.fromNullable(cookie.parse(document.cookie)[name])

export const getJWTBody = Either.try(
    compose(JSON.parse, atob, x => x.split('.')[1])
  )

export const createClassName = (prefix:string) =>
  (keys:string[]) =>
    (props:Dict) =>
      `${prefix} ` + keys
        .filter(x => props[x] !== undefined)
        .map(x => {
          if (typeof props[x] === 'boolean') {
            return `${prefix}-${x}`
          }
          return `${prefix}-${x}-${props[x]}`
        })
        .join(' ')
