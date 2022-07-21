import { Easing, Tween } from '@tweenjs/tween.js'
import { AdditiveBlending, BoxGeometry, DoubleSide, LineSegments, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, TextureLoader } from 'three'
import { broadcast } from '../utils/broadcast'
import { Bullet } from '../common/Bullet'
import { PlaygroundCTF } from './PlaygroundCTF'
import { BaseObject } from '../common/BaseObject'
import { TeamCTFPanel } from './TeamCTFPanel'
import { loop } from '../utils/loop'
import { TargetCTF } from './TargetCTF'
import { imgsDir } from '../consts'
import { random } from '../AWD'

// const tailMaterial = new MeshBasicMaterial({
//   transparent: true,
//   blending: AdditiveBlending,
//   side: DoubleSide,
//   depthWrite: false,
//   map: new TextureLoader().load(`${imgsDir}/team-tail.png`)
// })

let meshMaterial: MeshStandardMaterial


export class TeamCTF extends BaseObject {
  name: string //队伍名称
  target!: TargetCTF | null  // 当前攻击目标
  success = false

  panel: TeamCTFPanel
  box!: LineSegments
  mesh: Mesh
  // 一个虚拟的点，用于标识特写摄像机位置
  cpos = new Object3D()
  // 获胜记录
  winRecords: string[] = []
  // 初始旋转角度
  initialRotationY = 0

  constructor(mesh: Mesh, name: string) {
    super()
    this.name = name
    this.panel = new TeamCTFPanel(this, { y: 55, x: -40 })

    // 设置队伍（飞机模型）的材质
    const mtl = mesh.material as MeshStandardMaterial
    const normalMap = mtl.normalMap
    meshMaterial = meshMaterial || new MeshStandardMaterial({
      color: 0x455a69,
      roughness: 0.5,
      normalMap
    })
    const ms = mesh.clone()
    ms.material = meshMaterial
    this.mesh = ms
    // 设置队伍的位置属性
    ms.scale.set(0.3, 0.3, 0.3)
    ms.rotation.y = -Math.PI
    ms.position.y = -5

    // 设置立方缓冲几何体（模拟尾部动力装置，带颜色的部分）
    const g = new BoxGeometry(6, 24, 6)
    g.faces.splice(4, 2)
    g.faces.splice(4, 2)
    // 尾部的材质
    const m = new MeshBasicMaterial({
      transparent: true,
      blending: AdditiveBlending,
      side: DoubleSide,
      depthWrite: false,
      // 贴图
      map: new TextureLoader().load(`${imgsDir}/team-tail-${random(0, 7)}.png`)
    })
    const tail = new Mesh(g, m)
    tail.rotation.x = -Math.PI / 2
    tail.position.set(-20, -5, -55)
    // 第二个尾部动力装置
    const tail2 = tail.clone()
    tail2.position.x = 20

    this.position.y = 400
    // 设置一个位置，用于表示跟随当前队伍的特写相机的位置
    this.cpos.position.set(0, 20, -100)

    this.add(ms, tail, tail2, this.cpos)
  }

  // 进行攻击
  private startAttack() {
    const playground = this.playground as PlaygroundCTF
    playground.focus(this)
    this.lookAt((this.target as TargetCTF).position)
    const toRotate = { x: this.rotation.x, y: this.rotation.y, z: this.rotation.z }
    this.rotation.set(0, 0, 0)
    new Tween(this.position)
      .to({ y: 200 }, 400)
      .easing(Easing.Quartic.InOut)
      .onComplete(this.attack.bind(this))
      .start()
    new Tween(this.rotation)
      .to(toRotate, 300)
      .start()
  }
  private attack() {
    const { target, success } = this
    const playground = this.playground
    loop({
      interval: 150,
      times: 10,
      onStart: () => {
        setTimeout(() => { (target as TargetCTF).beAttack(this, success) }, 900)
      },
      callback: () => {
        this.lookAt((target as TargetCTF).position)
        Bullet.shoot(playground, this, (target as TargetCTF))
      },
      onEnd: () => {
        setTimeout(this.endAttack.bind(this), 1100)
      }
    })
  }

  private endAttack() {
    if (this.winRecords.length >= 3) broadcast(
      'KILL SPREE!!',
      `队伍 <span style="color:#fff">${this.name}</span> 连续攻破<span style="color:#fff">${this.winRecords.length}</span>题!`
    )
    this.target = null
    this.success = false

    new Tween(this.rotation)
      .to({ x: 0, y: this.initialRotationY, z: 0 }, 400)
      .start()
    new Tween(this.position)
      .to({ y: 300 })
      .easing(Easing.Quadratic.InOut)
      .start()
  }

  // 开始攻击
  toAttack(target: TargetCTF, success = false) {
    // 是否成功攻击目标，成功的添加进winRecords数组
    if (success) this.winRecords.push(target.name)
    else this.winRecords = []

    if (this.target) return
    // 保存当前攻击的目标
    this.target = target
    // 保存攻击的结果
    this.success = success
    if (this.playground.isPaused) {
      this.target.beAttack(this, success)
      this.target = null
      this.success = false
    } else {
      this.startAttack()
    }
  }

  destroy() {
    this.panel.destroy()
  }
}