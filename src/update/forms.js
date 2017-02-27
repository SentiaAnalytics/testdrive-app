//@flow
import type {Msg, Model, Dict, Driver, Testdrive} from '../model'
import {contains, assocPath, assoc} from '../util'
import * as task from '../tasks'


export default {
  setFormField: (state:Model, form:string, path:string[], value:any) =>
      [assocPath([form, ...path])(value)(state)],
}
