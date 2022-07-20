import { Matrix4, PlaneBufferGeometry } from 'three'

// 平面缓冲几何体
export class Terrain extends PlaneBufferGeometry {
  constructor (heightImg: HTMLImageElement) {
    const { width, height } = heightImg
    // width — 平面沿着X轴的宽度。默认值是1。
    // height — 平面沿着Y轴的高度。默认值是1。
    // widthSegments — （可选）平面的宽度分段数，默认值是1。
    // heightSegments — （可选）平面的高度分段数，默认值是1。
    // 将平面分段
    super(width, height, width - 1, height - 1)
    const rotation = new Matrix4().makeRotationX(-Math.PI / 2)
    this.applyMatrix4(rotation)

    // 将地面图片绘制到canvas上
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.drawImage(heightImg, 0, 0)
    // 像素图片信息
    const pixels = ctx.getImageData(0, 0, width, height).data

    // 对几何体顶点进行处理
    // 获取顶点数据构成的类型化数据
    const array = this.attributes.position.array as Array<number>
    const len = width * height
    for (let i = 0; i < len; i++) {
      // 将图片像素的r通道的值进行归一化之后，重新赋值给顶点数据的Y坐标，目的是将顶点数据更新，让地面处于随机凹凸状态
      array[i * 3 + 1] = pixels[i * 4] / 256
    }
  }
}