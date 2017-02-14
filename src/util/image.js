//@flow
import {chain, map, compose, merge} from './functions'
import Task from 'data.task'

type CompressionOptions = {
  resolution?: number,
  compressionRate?: number
}

const compressionDefaults:CompressionOptions = {
  resolution: 720,
  compressionRate: 0.7
}

const readAsArrayBuffer = (file:File) =>
  new Task((reject, resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result))
    reader.addEventListener('error', reject)
    reader.readAsArrayBuffer(file)
  })

export const createObjectUrl = (blob:Blob) =>
  (window.URL || window.webkitURL).createObjectURL(blob)

export const createImage = (src:string) => new Task((reject, resolve) => {
  const image = new Image()
  image.onload = () => resolve(image)
  image.src = src
})

export const imageFromFile = compose(chain(createImage), map(x => createObjectUrl(new Blob([x]))), readAsArrayBuffer)

const createCanvas = (width:number, height:number) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

export const toCanvas = (height: number) => (image:Image) => {
  const width = (image.width/image.height) * height
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
  }
  return canvas
}

export const compress = (rate: ?number)=> (canvas:any) =>
  new Task((_, resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', rate)
  )


export const compressImage = (file:File, {resolution = 1080, compressionRate = 0.7}:CompressionOptions) =>
  imageFromFile(file)
    .map(toCanvas(resolution))
    .chain(compress(compressionRate))
