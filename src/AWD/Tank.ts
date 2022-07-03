import { DoubleSide, Matrix4, Mesh, MeshStandardMaterial, PlaneBufferGeometry, TextureLoader } from 'three'
import { BaseObject } from '../common/BaseObject'
import { Bullet } from '../common/Bullet'
import { imgsDir } from '../consts'
import { loop } from '../utils/loop'
import { TargetAWD } from './TargetAWD'

const mtl = new MeshStandardMaterial({
  color: 0x666666,
  roughness: 0.4
})

export class Tank extends BaseObject{
  constructor(mesh: Mesh) {
    super()
    const ms = new Mesh(mesh.geometry, mtl)
    ms.scale.set(0.5, 0.5, 0.5)

    const g = new PlaneBufferGeometry(220, 170)
    g.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2))
    const m = new MeshStandardMaterial({
      // color: 0x666666,
      side: DoubleSide,
      depthWrite: false,
      transparent: true,
      map: new TextureLoader().load(`${imgsDir}/tank-shadow.png`)
    })
    const shadow = new Mesh(g, m)
    shadow.position.y = 0.5
    this.add(ms, shadow)
  }

  toAttack(target: TargetAWD) {
    const playground = this.playground
    loop({
      interval: 150,
      times: 10,
      callback: () => {
        Bullet.shoot(playground, this, target, true)
      }
    })
  }
}