//@flow
import type {Dict, Functor} from './model'

export const map = (f:Function) => (x:Functor) => x.map(f)
export const filter = (f:Function) => (x:{filter:Function}) => x.filter(f)
export const reduce = (f:Function) => (init: any) => (x:{reduce:Function}) => x.reduce(f, init)
export const head = ([x]: any[]) => x
export const tail = ([x, ...xs]: any[]) => xs

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

export const preventDefault = (e:{preventDefault:Function}) => {
  e.preventDefault()
  return e
}
