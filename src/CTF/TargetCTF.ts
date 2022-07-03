import { AdditiveBlending, BufferGeometry, Geometry, Line, LineBasicMaterial, Shape } from 'three'
import { random } from '../AWD'
import { Building } from '../common/Building'
import { roundedRect } from '../utils/roundedRect'
import { TargetCTFPanel } from './TargetCTFPanel'
import { TeamCTF } from './TeamCTF'

const outlineColors = [ 0xffea00, 0xa8ff00, 0x36ff00, 0x00ffc0, 0x00a2ff]

export class TargetCTF extends Building{
  name: string
  score: number
  panel: TargetCTFPanel
  // 获胜队伍
  winTeams: TeamCTF[] = []

  constructor(geometry: BufferGeometry | Geometry, name: string, score: number) {
    super(geometry)
    this.name = name
    this.score = score
    this.panel = new TargetCTFPanel(this, { y: 200 })

    const shape = roundedRect(new Shape(), 0, 0, 220, 220, 20)
    const geomertyPoints = new BufferGeometry().setFromPoints(shape.getPoints())
    const outline = new Line(geomertyPoints, new LineBasicMaterial({
      color: outlineColors[random(0, outlineColors.length - 1)],
      linewidth: 2,
      blending: AdditiveBlending
    }))
    outline.rotation.x = -Math.PI / 2
    outline.position.set(-110, -10, 110)
    this.add(outline)
  }

  beAttack(team: TeamCTF, success: boolean) {
    // 记录数据
    if (success) {
      this.panel.addItem(team.name)
      if (!this.winTeams.includes(team)) this.winTeams.push(team)
    }

    setTimeout(() => {
      // 执行爆炸、变色、显示面板
      this.explode()
      this.status = success ? 2 : 3
      this.panel.type = this.status

      setTimeout(() => {
        // 结束
        this.panel.type = 1
        this.status = success || this.winTeams.length ? 2 : 1
      }, 4000)
    }, 500)
  }

  destroy() {
    this.panel.destroy()
  }
}