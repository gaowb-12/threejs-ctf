export class MapGrid extends Array<{ x: number, y: number, value: number, used: boolean }> {
  size: number
  constructor(size = 20) {
    super()
    this.size = size

    // 画一个径向渐变，根据亮度来排序坐标
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const radius = size / 2
    const grd = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius)
    grd.addColorStop(0, '#fff')
    grd.addColorStop(0.2, '#888')
    grd.addColorStop(0.5, '#444')
    grd.addColorStop(1, '#222')
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, size, size)
    const pixels = ctx.getImageData(0, 0, size, size).data

    const array = []
    const len = pixels.length
    for (let i = 0; i < len; i += 4) {
      array.push(pixels[i])
    }
    const max = Math.max(...array)
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const num = array[x * size + y]
        const value = Math.round(num / max * 100)
        const item = {
          x: x - size / 2,
          y: y - size / 2,
          value,
          used: false
        }
        const center = size / 2 - 1
        if (value === 100 && x === center && y === center || value < 100) this.push(item)
      }
    }
    this.sort((a, b) => b.value - a.value)
  }
}