import { Panel, PanelOffset } from '../common/Panel'
import { BaseObject } from '../common/BaseObject'

export class TeamCTFPanel extends Panel {
  constructor(obj: BaseObject, offset?: PanelOffset) {
    super(obj, offset)
    this.content.classList.add('panel-team')
  }
}