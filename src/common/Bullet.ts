import { Tween } from '@tweenjs/tween.js'
import { BoxBufferGeometry, Mesh, MeshBasicMaterial, Object3D, QuadraticBezierCurve3, Vector3 } from 'three'
import { Playground } from './Playground'

const g = new BoxBufferGeometry(3, 3, 30)
const m = new MeshBasicMaterial({ color: 0xffff00 })

export class Bullet extends Mesh {
  static pool: Bullet[] = []

  public used: boolean

  constructor() {
    super(g, m)
    this.used = false
    Bullet.pool.push(this)
  }

  static shoot(playground: Playground, from: Object3D, to: Object3D, isCurve: boolean = false) {
    const bullet = Bullet.pool.find(b => !b.used) || new Bullet()
    bullet.used = true
    const sp = from.position.clone()
    const ep = to.position.clone()
    sp.applyMatrix4(from.parent.matrixWorld)
    ep.applyMatrix4(to.parent.matrixWorld)
    bullet.position.set(sp.x, sp.y, sp.z)
    playground.add(bullet)
    
    if (isCurve) {
      const curve = new QuadraticBezierCurve3(
        new Vector3(sp.x, sp.y, sp.z),
        new Vector3(sp.x + (ep.x - sp.x) / 2, 500, sp.z + (ep.z - sp.z) / 2),
        new Vector3(ep.x, ep.y, ep.z),
      )
      const obj = { t: 0 }
      new Tween(obj)
        .to({ t: 1 })
        .onUpdate((obj) => {
          const p = curve.getPoint(obj.t)
          const t = curve.getTangent(obj.t)
          bullet.position.set(p.x, p.y, p.z)
          bullet.rotation.set(t.x, Math.PI / 2 + t.y, 0)
        })
        .onComplete(() => {
          playground.remove(bullet)
          bullet.used = false
        })
        .start()
    } else {
      bullet.lookAt(to.position)
      new Tween(bullet.position)
        .to(ep, 1000)
        .onComplete(() => {
          playground.remove(bullet)
          bullet.used = false
        })
        .start()
    }
  }
}