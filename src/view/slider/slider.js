//@flow
import React from 'react'
import "./slider.scss"

type Props = {
  children?:any[],
  page:number
}
export default ({page, children}:Props) => {
  return (
    <div className="slider">
      <div className="slider-content" style={{left:`-${page * 100}%`}}>
        {children}
      </div>
    </div>
  )
}
