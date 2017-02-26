//@flow
import type {Model, ActionHandler} from '../model'
import {evolve} from '../util'

const handler: ActionHandler = {
  setSignature: (state:Model, base64Signature:string) =>
    [
      evolve({
        consentForm: { base64Signature: () => base64Signature },
        modals: { signature: () => false }
      })(state)
    ],
}
export default handler
