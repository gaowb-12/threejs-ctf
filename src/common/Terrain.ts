import { Matrix4, PlaneBufferGeometry } from 'three'

export class Terrain extends PlaneBufferGeometry {
  constructor (heightImg: HTMLImageElement) {
    const { width, height } = heightImg
    super(width, height, width - 1, height - 1)
    const rotation = new Matrix4().makeRotationX(-Math.PI / 2)
    this.applyMatrix4(rotation)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(heightImg, 0, 0)
    const pixels = ctx.getImageData(0, 0, width, height).data

    const array = this.attributes.position.array as Array<number>
    const len = width * height
    for (let i = 0; i < len; i++) {
      array[i * 3 + 1] = pixels[i * 4] / 256
    }
  }
}