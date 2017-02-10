//@flow

import React from 'react'
import './page-indicator.scss'
import {range, map} from '../../util'

type Props = {
  current: number,
  of: number
}

const pageIndicator = (page:number) => (i:number) =>
  <div key={i} className={`page-indicator-page ${page === i ? 'page-indicator-current' : ''}`}></div>

export default (props:Props) =>
  <div className="page-indicator">
    {map(pageIndicator(props.current))(range(1)(props.of))}
  </div>
