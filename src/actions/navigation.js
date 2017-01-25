//@flow
import type {Action} from '../model'


export const historyPush = (payload:string):Action => ({
    type: 'HISTORY_PUSH',
    payload
})

export const historyPop = (payload:string):Action => ({
    type: 'HISTORY_POP',
    payload
})

export const historyReplace = (payload:string):Action => ({
    type: 'HISTORY_REPLACE',
    payload
})
