//@flow
import type {Loc} from '../model'

import React from 'react'
type Props = {
  pattern:string,
  location: Loc,
  render: Function
}
export default ({pattern, location, render}:Props) => {
  if (location.pathname !== pattern) return null
  return render()
}
