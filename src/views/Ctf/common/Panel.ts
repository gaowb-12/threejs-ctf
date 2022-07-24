import { PerspectiveCamera, WebGLRenderer } from 'three'
import { h } from '../utils/dom'
import { BaseObject } from './BaseObject'

export interface PanelOffset {
  x?: number
  y?: number
  z?: number
}
export class Panel {
  static instances: Panel[] = []
  static renderer: WebGLRenderer
  static camera: PerspectiveCamera

  public obj: BaseObject
  public el: HTMLDivElement |null
  private _visible = false
  public offset: PanelOffset
  public content: HTMLDivElement
  public distance: number

  constructor(obj: BaseObject, offset?: PanelOffset, distance = 1200) {
    // 对应的队伍或者靶标
    this.obj = obj
    // 队伍或者靶标提示标签（队伍或者靶标上方的HTML标签）
    this.el = h('div') as HTMLDivElement
    this.el.className = 'panel'
    this.content = h('div') as HTMLDivElement
    this.content.className = 'panel-content'
    this.content.innerHTML = this.obj.name || '_'
    this.distance = distance
    this.el.appendChild(this.content)
    // 创建最外层的HTML标签，用于包裹所有队伍或者靶标的提示标签
    let panelsContainer = document.querySelector('.panels')
    if (!panelsContainer) {
      panelsContainer = h('div')
      panelsContainer.className = 'panels'
      document.body.appendChild(panelsContainer)
    }
    panelsContainer.appendChild(this.el)
    // 保存队伍和靶标实例，用于更新对应实例的动画
    Panel.instances.push(this)

    this.offset = offset || { x: 0, y: 0, z: 0 }
  }

  // 更新场景内的队伍和靶标实例动画
  static update() {
    Panel.instances.forEach(p => p.update())
  }

  // 队伍和靶标标签的控制
  public update() {
    const p = this.obj.position.clone()
    // 获取世界坐标
    this.obj.getWorldPosition(p)
    // 距离相机的距离（Panel.camera保存了特写相机跟第三人称相机）
    const distance = Panel.camera.position.distanceTo(p)

    p.y += ((this.offset as any).y * this.obj.scale.y)
    // 将此向量(坐标)从世界空间投影到相机的标准化设备坐标 (NDC) 空间。
    const v = p.project(Panel.camera)

    // webgl坐标转换为屏幕坐标
    v.x = (v.x + 1) / 2 * window.innerWidth
    v.y = -(v.y - 1) / 2 * window.innerHeight
    
    let style = `transform: translate3d(${v.x}px, ${v.y}px, 0);`
    // 距离相机远的需要隐藏
    if (distance > this.distance || distance <= 0) style += `visibility: hidden;`
    else style += `visibility: visible;`;

    (this.el as HTMLDivElement).setAttribute('style', style)
  }

  public destroy() {
    document.body.removeChild(this.el as HTMLDivElement);
    this.el = null
  }
}

