import { Panel, PanelOffset } from '../common/Panel'

export class TeamCTFPanel extends Panel {
  constructor(obj, offset?: PanelOffset) {
    super(obj, offset)
    this.content.classList.add('panel-team')
  }
}