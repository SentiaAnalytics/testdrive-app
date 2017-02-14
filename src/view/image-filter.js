//@flow weak

import React from 'react'
import {createImage, compose, compress} from '../util'

const drawImage = canvas => img => {
  const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas
}

const applyFilter = filter => canvas => {
  const ctx = canvas.getContext('2d')
  const pixels = ctx.getImageData(0, 0, canvas.width,canvas.height);

  ctx.putImageData(filter(pixels), 0, 0)
  return canvas
}

const threshold = threshold => pixels => {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;
};


export default class ImageFilter extends React.Component {
  constructor () {
    super()
  }

  componentDidMount () {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
    const filter = threshold(90)
    createImage('/img/test.jpg')
      .map(drawImage(canvas))
      .map(applyFilter(filter))
      .fork(console.error, console.log)



  }


  render () {
    return (
      <canvas width="500" height="500" ref="canvas" style={{width:500, height:500}}></canvas>
    )
  }
}
