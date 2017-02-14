//@flow weak
import React from 'react'
import Camera from './camera'
import {compose, targetFiles, map, chain} from '../util'
import {toCanvas, compress, imageFromFile, createObjectUrl } from '../util/image'
import {applyFilter, threshold2, convolute, sharpen, blur} from '../util/filters'
import Task from 'data.task'
import {Layout, Col, Padding} from './layout'
import Loader from './loader'

const log = key => value => (console.log(key, value), value)
const tessOptions = {
  lang: 'eng',
  tessedit_char_whitelist: '-0123456789'
}

const tesseract = (image) =>
  new Task((reject, resolve) =>
    window.Tesseract.recognize(image, tessOptions).then(resolve, reject))

const getImageCanvas = (resolution:number) =>
  compose(map(toCanvas(resolution)), imageFromFile)

const renderWord = ({text, bbox: {x0, x1, y0, y1}}) =>
  <div style={{
    position: 'absolute',
    border: '1px solid red',
    top: y0,
    left: x0,
    width: x1 - x0,
    height: y1-y0
  }} title={text}></div>


export default class Tess extends React.Component {
  state : any
  constructor () {
    super()
    this.state = {result: {}, imageUrl: null, loading:false, time: 0}
  }

  onCapture (files) {
    const filter = compose(threshold2(100))
    const t1 = Date.now()
    this.setState({loading:true})
    getImageCanvas(2000)(files[0])
      .map(applyFilter(filter))
      .chain(compress(0.7))
      .map(log('image'))
      .chain(blob =>
        tesseract(blob)
          .map(result => ({result, blob}))
      )
      .fork(
        console.error,
        ({result, blob}) => {
          console.log('total time', )
          this.setState({
            time: Date.now() - t1,
            loading: false,
            result,
            imageUrl: createObjectUrl(blob)
          })
        }
      )
  }

  render () {
    const {time, loading, result, imageUrl} = this.state
    console.log(result)
    if (loading) return <Loader message="processing image" show={true}/>
    return (
      <Layout column primary style={{height: '100%'}}>
        <Layout grow={1} shrink={1} column center middle>
          <Col>
            <Padding>
              <Camera onChange={compose(x => this.onCapture(x), targetFiles)}/>
            </Padding>
          </Col>
          <Col white>
            <Padding>
              <div style={{display: 'table', position:'relative', padding:0, border:0}}>
              {result.words ? map(renderWord)(result.words) : null}
              <img src={imageUrl}/>
              </div>
              <h3>{result.text && result.text.match(/[0-3][0-9][0-1][0-9]\d{2}\-\d{4}/)}</h3>
              <p> {time}ms</p>
              <pre> {result.text}</pre>
            </Padding>
          </Col>
        </Layout>
        <Col>
        <Padding/>
        </Col>
      </Layout>
    )
  }
}
