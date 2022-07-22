import { Tween } from '@tweenjs/tween.js'
import { BoxBufferGeometry, Mesh, MeshBasicMaterial, Object3D, QuadraticBezierCurve3, Vector3 } from 'three'
import { Playground } from './Playground'

const g = new BoxBufferGeometry(3, 3, 30)
const m = new MeshBasicMaterial({ color: 0xffff00 })

// 子弹网格对象
export class Bullet extends Mesh {
  static pool: Bullet[] = []

  public used: boolean

  constructor() {
    super(g, m)
    this.used = false
    Bullet.pool.push(this)
  }

  static shoot(playground: Playground, from: Object3D, to: Object3D, isCurve = false) {
    // 获取没有被使用的子弹网格对象
    const bullet = Bullet.pool.find(b => !b.used) || new Bullet()
    bullet.used = true
    // 获取攻击队伍，与被攻击靶标的坐标
    const sp = from.position.clone()
    const ep = to.position.clone()
    // 设置两点的世界坐标位置
    // from.parent是队伍组，to.parent是playgroundCTF场景实例
    sp.applyMatrix4((from.parent as Object3D).matrixWorld)
    ep.applyMatrix4((to.parent as Object3D).matrixWorld)
    // 子弹的位置
    bullet.position.set(sp.x, sp.y, sp.z)
    playground.add(bullet)
    
    if (isCurve) {
      // 是曲线
      // 创建贝塞尔曲线
      const curve = new QuadraticBezierCurve3(
        new Vector3(sp.x, sp.y, sp.z),
        new Vector3(sp.x + (ep.x - sp.x) / 2, 500, sp.z + (ep.z - sp.z) / 2),
        new Vector3(ep.x, ep.y, ep.z),
      )
      const obj = { t: 0 }
      new Tween(obj)
        .to({ t: 1 })
        .onUpdate((obj) => {
          // 获取曲线上的位置
          const p = curve.getPoint(obj.t)
          // 某位置的单位向量切线
          const t = curve.getTangent(obj.t)
          // 设置子弹位置的轨迹路线
          bullet.position.set(p.x, p.y, p.z)
          // 设置子弹的旋转
          bullet.rotation.set(t.x, Math.PI / 2 + t.y, 0)
        })
        .onComplete(() => {
          playground.remove(bullet)
          bullet.used = false
        })
        .start()
    } else {
      // 非曲线
      // 子弹直接朝向靶标
      bullet.lookAt(to.position)
      // 将子弹的位置从队伍变化到靶标
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