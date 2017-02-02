//@flow

export type AsyncState =
  'NONE'
  | 'PENDING'
  | 'SUCCESS'
  | 'ERROR'

export type Async<X> = {
  status: AsyncState,
  value?: X
}
