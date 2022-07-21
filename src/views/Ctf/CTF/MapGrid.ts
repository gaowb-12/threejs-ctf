export class MapGrid extends Array<{ x: number, y: number, value: number, used: boolean }> {
  size: number
  constructor(size = 20) {
    super()
    this.size = size

    // 画一个径向渐变，根据亮度来排序坐标
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const radius = size / 2
    // 绘制径向渐变
    const grd = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius)
    grd.addColorStop(0, '#fff')
    grd.addColorStop(0.2, '#888')
    grd.addColorStop(0.5, '#444')
    grd.addColorStop(1, '#222')
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, size, size)
    // 获取径向渐变的像素数据
    const pixels = ctx.getImageData(0, 0, size, size).data

    const array = [] //保存r通道的数值
    const len = pixels.length
    for (let i = 0; i < len; i += 4) {
      array.push(pixels[i])
    }
    // r通道的最大值（最大255，在画布中心）
    const max = Math.max(...array)
    for (let x = 0; x < size; x++) {//第几行
      for (let y = 0; y < size; y++) {//第几列
        // 第几个像素点的r通道值
        const num = array[x * size + y]
        // 当前r通道值与最大r通道值的所占百分比
        const value = Math.round(num / max * 100)
        const item = {
          // 描述位置坐标(-10 到 10)
          x: x - size / 2,
          y: y - size / 2,
          value,
          used: false
        }
        // 中心坐标
        const center = size / 2 - 1 ; // 9
        // 将每个像素点处理之后的数据保存
        if (value === 100 && x === center && y === center || value < 100) this.push(item)
      }
    }
    // 升序排列
    this.sort((a, b) => b.value - a.value)
  }
}