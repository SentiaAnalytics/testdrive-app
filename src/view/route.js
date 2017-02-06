//@flow
import type {Loc} from '../model'

import React from 'react'
type Props = {
  match:string,
  location: Loc,
  children?:any[]
}
export default ({path, location,  children}:Props) => {
  if (location.pathname !== path) return null
  return children[0]
}
