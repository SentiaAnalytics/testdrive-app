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

const createImage = (src:string) => new Task((reject, resolve) => {
  const image = new Image()
  image.onload = () => resolve(image)
  image.src = src
})

const createCanvas = (width:number, height:number) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

const createObjectURL = buffer =>
  (window.URL || window.webkitURL).createObjectURL(new Blob([buffer]))

const compress = (options:CompressionOptions) => (image:Image) =>
  new Task((reject, resolve) => {
  const {resolution: height, compressionRate} = merge(compressionDefaults)(options)
  const width = (image.width/image.height) * height
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')
  console.log(image.width, image.height)
  if (ctx) {
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
  }
  return canvas.toBlob(resolve, 'image/jpeg', compressionRate)
})

export const compressImage = (file:File, options:CompressionOptions) =>
  readAsArrayBuffer(file)
    .map(createObjectURL)
    .chain(createImage)
    .chain(compress(options))
