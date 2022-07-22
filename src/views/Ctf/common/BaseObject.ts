import { Object3D } from 'three'
import { Playground } from './Playground'

export class BaseObject extends Object3D{
  // 取值属性，获取祖先类型为Scene的对象
  get playground(): Playground {
    let p = this.parent
    while (p && p.type !== 'Scene') p = p.parent
    return p as Playground
  }
}