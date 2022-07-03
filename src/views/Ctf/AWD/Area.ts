import { AdditiveBlending, BoxGeometry, DoubleSide, EdgesGeometry, LineSegments, Matrix4, Mesh, MeshBasicMaterial } from 'three'
import { GRID_SIZE, HEIGHT, WIDTH } from './PlaygroundAWD'

const colors = {
  1: 0x3cb8ff,
  2: 0x00fff2,
  3: 0x00ff4c,
  4: 0xffd900,
  5: 0xff533c,
  6: 0xb83dff,
}

interface AreaData {
  x: number,
  y: number,
  w: number,
  h: number,
  c: number
}

export class Area extends Mesh{
  constructor(data: AreaData) {
    const { x, y, w, h, c } = data
    const width = GRID_SIZE * w
    const height = GRID_SIZE * h
    const g = new BoxGeometry(width, GRID_SIZE / 2, height)
    g.faces.splice(4, 2)
    g.faces.splice(4, 2)
    g.applyMatrix4(new Matrix4().makeTranslation(width / 2, GRID_SIZE / 4 + 1, height / 2))
    const color = colors[c as 1,2,3,4,5,6] || colors[1]
    const m = new MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.5,
      side: DoubleSide,
      blending: AdditiveBlending,
      depthWrite: false
    })
    super(g, m)
    this.position.x = x * GRID_SIZE - WIDTH / 2
    this.position.z = y * GRID_SIZE - HEIGHT / 2

    const edge = new LineSegments(
      new EdgesGeometry(g, 0.1),
      new MeshBasicMaterial({ color, blending: AdditiveBlending })
    )
    this.add(edge)
  }
}