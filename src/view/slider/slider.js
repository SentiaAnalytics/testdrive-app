//@flow
import React from 'react'
import "./slider.scss"

type Props = {
  children:any[],
  page:number
}
export default ({page, children}:Props) => {
  const contentStyle = {
    transform: `translateX(-${page * 100}%)`
  }
  return (
    <div className="slider">
      <div className="slider-content" style={contentStyle}>
        {children}
      </div>
    </div>
  )
}
