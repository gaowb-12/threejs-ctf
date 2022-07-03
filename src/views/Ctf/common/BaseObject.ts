import { Object3D } from 'three'
import { Playground } from './Playground'

export class BaseObject extends Object3D{
  get playground(): Playground {
    let p = this.parent
    while (p && p.type !== 'Scene') p = p.parent
    return p as Playground
  }
}