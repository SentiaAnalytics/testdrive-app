//@flow
import type {Dict} from '../model'
import Maybe from 'data.maybe'
import Either from 'data.either'
import cookie from 'cookie'




export const flip =(f:Function) => (a:any) => (b:any) =>f(b)(a)

export const sort = (f:Function) => (xs: any[]) => xs.sort(f)

export const append = (x:any) => (xs:any[]) => [...xs, x]

export const any = (f:Function) => (xs:any[]) => xs.some(f)
export const all = (f:Function) => (xs:any[]) => xs.every(f)

export const find = (f:Function) => (xs:any[]) => xs.find(f)

export const contains = (y:any) => any(x => x === y)

export const omit = (keys:string[]) => (dict:Dict) =>
  Object.keys(dict)
    .filter(x => !contains(x)(keys))
    .reduce((acc, k) => ({...acc, [k]: dict[k]}), {})

export const pick = (keys: string[]) => (obj:Dict) =>
  keys.reduce((o, k) => ({...o, [k]: obj[k]}), {})

export const split = (separator:any) => (s:string) => s.split(separator)

export const map = (f:Function) => (x:any) => x.map(f)
export const filter = (f:Function) => (x:{filter:Function}) => x.filter(f)
export const reduce = (f:Function) => (init: any) => (x:{reduce:Function}) => x.reduce(f, init)
export const head = ([x]: any[]) => x
export const tail = ([x, ...xs]: any[]) => xs

export const chain = (f:Function) => (x:any) => x.chain(f)
export const merge = (a:Dict)=> (b:Dict) => Object.assign({}, a, b)
export const range = (from:number) => (to:number) =>
  Array.from(Array(to).keys(), x =>x + from)


export const indexBy = (f:Function) => (xs:any[]) =>
  xs.reduce((o, x) => ({...o, [f(x)]: x}), {})

export const zip = (as:any[]) => (bs:any[]) => {
  const go = (result, [a, ...as], [b, ...bs]) =>
    a === undefined || b === undefined ? result : go([...result, [a, b]], as, bs)
  return go([], as, bs)
}

export const toPairs = (d:Dict) =>
  Object.keys(d).map(k => [k, d[k]])

export const fromPairs = (pairs:any[]) =>
  pairs.reduce((o, [k, v]) => ({...o, [k]:v}), {})

export const mapObj = (f:Function) => (dict:Dict) =>
  Object.keys(dict).reduce((o, k) => ({...o, [k]: f(dict[k])}), {})

export const compose = (...fs: Function[]) =>
  fs.reduce((g, f) => x => g(f(x)), x => x)

export const composeK = (...fs: Function[]) =>
  compose(...fs.map(map))

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
