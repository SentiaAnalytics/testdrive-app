//@flow
import type {Action} from '../model'
export const setSignature = (base64Signature: string):Action =>
  ({type: 'SET_SIGNATURE', payload: base64Signature})
