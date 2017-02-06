//@flow
import history from '../../history'
import {compose, preventDefault} from '../../util'
import React from 'react'

type Props = {
  children?:any[],
  to:string,
}
export default ({to, children}:Props) =>
  <a href={to} onClick={compose(() => history.push(to), preventDefault)}>
    {children}
  </a>
