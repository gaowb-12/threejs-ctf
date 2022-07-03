import { BufferGeometry, Geometry } from 'three'
import { Building } from '../common/Building'
import { devices } from './devices'
import { GRID_SIZE, HEIGHT, WIDTH } from './PlaygroundAWD'
import { TargetAWDPanel } from './TargetAWDPanel'

interface DeviceData {
  id: string,
  name: string,
  x: number,
  y: number,
  w: number,
  h: number,
  c: number,
  s: number
}

export class TargetAWD extends Building{
  name: string
  size: number
  icon: string
  score: number
  _score: number
  panel: TargetAWDPanel

  constructor(geometry: BufferGeometry | Geometry, data: DeviceData){
    const size = data.h * GRID_SIZE
    super(geometry, GRID_SIZE)
    const x = data.x * GRID_SIZE + size / 2 - WIDTH / 2
    const z = data.y * GRID_SIZE + size / 2 - HEIGHT / 2
    this.position.set(x, size * 0.08, z)
    this.scale.set(data.w, data.w, data.h)
    this.name = data.name
    this.size = size
    this.icon = devices[data.c - 1]?.icon ?? 'devices'
    this.score = this._score = data.s || 5

    this.panel = new TargetAWDPanel(this)
  }
  beAttack() {
    setTimeout(() => {
      const s = this._score - 1
      this._score = s < 0 ? 0 : s
      this.explode()
      if (this._score === 0) this.status = 2
      this.panel.setScore(this._score, this.score)
    }, 1800)
  }
  destroy () {
    this.panel.destroy()
  }
}