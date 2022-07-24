import { Easing, Tween } from '@tweenjs/tween.js'
import { AdditiveBlending, DoubleSide, Mesh, MeshBasicMaterial, PlaneBufferGeometry, Texture, TextureLoader } from 'three'
import { imgsDir } from '../consts'
import { BaseObject } from './BaseObject'

export class Fire extends BaseObject {
  static pool: Fire[] = []
  static size = 100
  // 通过纹理贴图实现爆炸效果（帧图片）
  static texture: Texture = new TextureLoader().load(`${imgsDir}/fire1.png`)

  texture: Texture
  used = false
  // 从第一帧开始动画
  tween = new Tween({ index: 0 })

  constructor() {
    super()
    const g = new PlaneBufferGeometry(Fire.size, Fire.size)
    const m = new MeshBasicMaterial()
    // 设置纹理
    const texture = Fire.texture.clone()
    texture.needsUpdate = true // 不加这个 clone 无效
    // 在每个方向 U 和 V，纹理在表面上重复多少次（这里的四分之一感觉是属于截取了）
    texture.repeat.set(1 / 4, 1 / 4)
    // 在 U 和 V 的每个方向上，纹理的单个重复从开头偏移多少（这里感觉是从雪碧图的第几个小图开始）
    texture.offset.x = 0 / 4
    texture.offset.y = 3 / 4
    // 设置材质
    // 定义将要渲染哪一面 - 正面，背面或两者。（这里表示两面都渲染）
    m.side = DoubleSide
    // 定义此材质是否透明。这对渲染有影响，因为透明对象需要特殊处理，并在非透明对象之后渲染。
    m.transparent = true
    // 渲染此材质是否对深度缓冲区有任何影响。默认为true。
    m.depthWrite = false
    // 设置颜色纹理贴图
    m.map = texture
    // 在使用此材质显示对象时要使用何种混合（主要控制纹理融合的叠加方式）。
    m.blending = AdditiveBlending;//加法融合模式（应该是再着色器中的色值直接相加）

    // 生成网格对象
    const mesh = new Mesh(g, m)
    // 多生成两个网格对象，为了叠加爆炸效果，看起来更逼真
    const mesh1 = new Mesh(g, m)
    const mesh2 = new Mesh(g, m)
    mesh1.rotation.y = -Math.PI / 2
    mesh2.rotation.x = Math.PI / 2
    mesh2.position.y = -10
    this.add(mesh)
    this.texture = texture

    // 从0变化到15实现爆炸效果
    this.tween.to({ index: 15 }, 2000)
      .easing(Easing.Linear.None)
      .onStart(() => {
        this.playground.add(this)
      })
      .onUpdate(({ index }) => {
        // 改变纹理坐标的偏移，用于获取雪碧图上不同的图片
        const x = ~~(index % 4)
        const y = 3 - ~~(index / 4)
        texture.offset.x = x / 4
        texture.offset.y = y / 4
      })
      .onComplete(() => {
        // 从场景中移除待用
        this.playground.remove(this)
        this.used = false
      })

      // 缓存待用
    Fire.pool.push(this)
  }

  start() {
    // 开始爆炸特效
    this.tween.start()
  }

  // 获取一次爆炸效果
  static getOne() {
    const fire = Fire.pool.find(f => !f.used) || new Fire()
    fire.used = true
    return fire
  }
}