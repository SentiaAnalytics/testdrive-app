//@flow
import {cmd} from '../start-app'
import type {Model, ActionHandler} from '../model'
import {evolve} from '../util'

const handler: ActionHandler = {
  SET_SIGNATURE: (state:Model, base64Signature:string) =>
    evolve({
    concentForm: { base64Signature: () => base64Signature },
    modals: { signature: () => false }
  })(state),
}
export default handler
