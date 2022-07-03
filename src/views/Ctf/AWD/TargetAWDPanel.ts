import { Panel } from '../common/Panel'
import { TargetAWD } from './TargetAWD'

export class TargetAWDPanel extends Panel{
  constructor(target: TargetAWD) {
    super(target, { y: target.size * 0.2 }, 5000)
    this.content.classList.add('panel-target-awd')
    this.content.innerHTML = `<div class="icon">${target.icon}</div>
    <div class="f1" style="padding: 3px 10px 0 0;">
      <div>${target.name}</div>
      <div class="bar"><div class="bld" style="width: 100%"></div></div>
    </div>`
  }
  setScore(score: number, total: number) {
    const bld = (this.el as HTMLDivElement).querySelector('.bld') as HTMLElement
    bld.style.width = score / total * 100 + '%'
  }
}