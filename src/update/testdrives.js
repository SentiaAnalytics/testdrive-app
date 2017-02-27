//@flow
import type {Testdrive,  Model, Msg} from '../model'
import {assocPath, indexBy} from '../util'
import * as task from '../tasks'

export default {

  getTestdriveListFail: (state:Model, err:string, msg:Msg) =>
    [
      {...state, testdrivesList: {status:'FAIL'}},
      task.call(msg.toastDanger, err)
    ],
  getTestdriveListSuccess: (state:Model, testdrives:Testdrive[], msg:Msg) =>
    [ {...state, testdriveList: {status:'SUCCESS', value:indexBy(x => x.id)(testdrives)}} ],
}
