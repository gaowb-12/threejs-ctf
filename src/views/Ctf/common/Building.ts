import { AdditiveBlending, Box3, BoxBufferGeometry, BufferGeometry, EdgesGeometry, Geometry, LineBasicMaterial, LineSegments, Matrix4, Mesh, MeshLambertMaterial, Vector3 } from 'three'
import { BaseObject } from './BaseObject'
import { Fire } from './Fire'

const materials = {
  normal: {
    mesh: new MeshLambertMaterial({ color: 0x78abff, transparent: true, opacity: 0.55 }),
    line: new LineBasicMaterial({ color: 0x006bff, blending: AdditiveBlending, transparent: true, visible: false }),
    box: new MeshLambertMaterial({ color: 0x2a3d5c, transparent: true, opacity: 0.6, blending: AdditiveBlending, depthWrite: false }),
  },
  red: {
    mesh: new MeshLambertMaterial({ color: 0xa01717 }),
    line: new LineBasicMaterial({ color: 0xff2000, blending: AdditiveBlending, transparent: true, opacity: 0.3, visible: true }),
    box: new MeshLambertMaterial({ color: 0xff2000, transparent: true, opacity: 0.6, blending: AdditiveBlending, depthWrite: false }),
  },
  blue: {
    mesh: new MeshLambertMaterial({ color: 0x0061ff }),
    line: new LineBasicMaterial({ color: 0x006bff, blending: AdditiveBlending, transparent: true, opacity: 0.2, visible: true }),
    box: new MeshLambertMaterial({ color: 0x006bff, transparent: true, opacity: 0.6, blending: AdditiveBlending, depthWrite: false }),
  }
}

enum Status {
  normal = 1,
  blue = 2,
  red = 3
}

export class Building extends BaseObject {
  mesh: Mesh
  line: LineSegments
  box: Mesh
  _size: number
  _status!: Status

  constructor(geometry: BufferGeometry | Geometry, size = 200) {
    super()
    // 模型
    this._size = size
    const ms = new Mesh(geometry, materials.normal.mesh)
    const msbox = new Box3().setFromObject(ms)
    const boxSize = msbox.getSize(new Vector3())
    if (boxSize.x !== boxSize.y) {
      const scale = new Matrix4().makeScale(size / boxSize.x, size / boxSize.y, size / boxSize.z)
      geometry.applyMatrix4(scale)
      // const translation = new Matrix4().makeTranslation(0, 24, 0)
      // geometry.applyMatrix4(translation)
    }
    this.add(ms)

    // 描边
    const edges = new EdgesGeometry(ms.geometry)
    const line = new LineSegments(edges, materials.normal.line)
    this.add(line)

    // 盒子
    const boxGeometry = new BoxBufferGeometry(size, size, size)
    boxGeometry.applyMatrix4(new Matrix4().makeTranslation(0, size / 2, 0))
    const boxEdges = new EdgesGeometry(boxGeometry)
    const boxLines = new LineSegments(boxEdges, materials.blue.line)
    const box = new Mesh(boxGeometry, materials.normal.box)
    box.add(boxLines)
    this.add(box)

    box.visible = false
    this.mesh = ms
    this.line = line
    this.box = box
    
  }

  // 爆炸特效
  explode() {
    const playground = this.playground
    if (!playground.isPaused) {

      // 获取一次爆炸效果（获取实例）
      const fire = Fire.getOne()
      // 定位爆炸发生的位置
      fire.position.copy(this.position)
      fire.position.y += this._size / 2
      // 爆炸的范围
      const scale = this._size * this.scale.x / Fire.size * 1.8
      const scaleY = this._size * this.scale.y / Fire.size * 2
      fire.scale.set(scale, scaleY, scale)
      playground.add(fire)
      // 爆炸特效开始
      fire.start()
  
      // 在产生一次爆炸，增强效果
      setTimeout(() => {
        const fire1 = Fire.getOne()
        fire1.position.copy(fire.position)
        fire1.scale.copy(fire.scale)
        fire1.rotation.y = -Math.PI / 4
        playground.add(fire1)
        fire1.start()
      }, 800)
    }
  }

  set status (status: Status) {
    this._status = status
    switch (status) {
      case Status.blue:
        this.setMaterial('blue')
        break
      case Status.red:
        this.setMaterial('red')
        break
      default:
        this.setMaterial('normal')
    }
  }
  get status(): Status {
    return this._status
  }

  private setMaterial(mtlstr: 'normal'|'red'|'blue') {
    this.mesh.material = materials[mtlstr].mesh
    this.line.material = materials[mtlstr].line
    this.box.material = materials[mtlstr].box
    const boxBorderMtl = mtlstr === 'normal' ? materials.blue.line : materials[mtlstr].line;
    (this.box.children[0] as Mesh)['material'] = boxBorderMtl
  }
}