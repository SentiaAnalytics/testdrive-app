//@flow
import type {Action, Toast} from '../model'
export const showToast = (payload: Toast) => ({type:'SHOW_TOAST', payload})
export const hideToast = {type:'HIDE_TOAST'}
