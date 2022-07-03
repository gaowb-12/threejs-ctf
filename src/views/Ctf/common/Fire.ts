import { Easing, Tween } from '@tweenjs/tween.js'
import { AdditiveBlending, DoubleSide, Mesh, MeshBasicMaterial, PlaneBufferGeometry, Texture, TextureLoader } from 'three'
import { imgsDir } from '../consts'
import { BaseObject } from './BaseObject'

export class Fire extends BaseObject {
  static pool: Fire[] = []
  static size = 100
  static texture: Texture = new TextureLoader().load(`${imgsDir}/fire1.png`)

  texture: Texture
  used = false
  tween = new Tween({ index: 0 })

  constructor() {
    super()
    const g = new PlaneBufferGeometry(Fire.size, Fire.size)
    const m = new MeshBasicMaterial()
    const texture = Fire.texture.clone()
    texture.needsUpdate = true // 不加这个 clone 无效
    texture.repeat.set(1 / 4, 1 / 4)
    texture.offset.x = 0 / 4
    texture.offset.y = 3 / 4
    m.side = DoubleSide
    m.transparent = true
    m.depthWrite = false
    m.map = texture
    m.blending = AdditiveBlending
    const mesh = new Mesh(g, m)
    const mesh1 = new Mesh(g, m)
    const mesh2 = new Mesh(g, m)
    mesh1.rotation.y = -Math.PI / 2
    mesh2.rotation.x = Math.PI / 2
    mesh2.position.y = -10
    this.add(mesh, mesh1, mesh2)
    this.texture = texture

    this.tween.to({ index: 15 }, 2000)
      .easing(Easing.Linear.None)
      .onStart(() => {
        this.playground.add(this)
      })
      .onUpdate(({ index }) => {
        const x = ~~(index % 4)
        const y = 3 - ~~(index / 4)
        texture.offset.x = x / 4
        texture.offset.y = y / 4
      })
      .onComplete(() => {
        this.playground.remove(this)
        this.used = false
      })

    Fire.pool.push(this)
  }

  start() {
    this.tween.start()
  }

  static getOne() {
    const fire = Fire.pool.find(f => !f.used) || new Fire()
    fire.used = true
    return fire
  }
}