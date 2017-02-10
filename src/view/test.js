import React from 'react'
import {compressImage} from '../util'
import {Slider, Slide} from './slider'

export default (props) =>
  <Slider page={2}>
    <Slide><h1> page 1</h1></Slide>
    <Slide><h1> page 2</h1></Slide>
    <Slide><h1> page 3</h1></Slide>
    <Slide><h1> page 4</h1></Slide>
  </Slider>
