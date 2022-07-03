import { Panel, PanelOffset } from '../common/Panel'
import { h } from '../utils/dom'
import { TargetCTF } from './TargetCTF'

export class TargetCTFPanel extends Panel {
  titleEl: HTMLDivElement
  listEl: HTMLDivElement
  private _type: 1 | 2 | 3 = 1
  constructor(target: TargetCTF, offset?: PanelOffset) {
    super(target, offset)
    this.content.innerHTML = ''
    this.content.classList.add('panel-target')
    this.titleEl = h('div') as HTMLDivElement
    this.titleEl.className = 'panel-target-title'
    this.titleEl.innerHTML = `<span class="name">${target.name}</span><span class="score">${target.score}分</span>`

    this.listEl = h('div') as HTMLDivElement
    this.listEl.className = 'panel-target-list'
    this.content.appendChild(this.titleEl)
    this.content.appendChild(this.listEl)
    
    this.el.addEventListener('mouseenter', e => {
      target.box.visible = true
    })
    this.el.addEventListener('mouseleave', e => {
      target.box.visible = false
    })
  }
  addItem(name: string) {
    const count = this.listEl.childElementCount
    if (count === 3) return
    const item = h('div')
    item.className = 'panel-target-item'
    item.innerHTML = `<span class="top">TOP0${count + 1}</span><span class="tname">${name}</span>`
    this.listEl.appendChild(item)
  }

  set type(type: 1 | 2 | 3) {
    this.content.classList.remove(`panel-target-type-1`)
    this.content.classList.remove(`panel-target-type-2`)
    this.content.classList.remove(`panel-target-type-3`)
    this.content.classList.add(`panel-target-type-${type}`)
    this._type = type
  }
  get type() {
    return this._type
  }

  update() {
    super.update()
    if (this._type !== 1) {
      this.el.style.visibility = 'visible'
    }
  }
}