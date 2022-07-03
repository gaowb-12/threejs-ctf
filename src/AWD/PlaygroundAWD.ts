import { AdditiveBlending, DoubleSide, EdgesGeometry, LineBasicMaterial, LineSegments, Matrix4, Mesh, MeshStandardMaterial, PerspectiveCamera, PlaneBufferGeometry, PointLight, TextureLoader, WebGLRenderer } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { Panel } from '../common/Panel'
import { Playground } from '../common/Playground'
import { AWDAssets } from './AWDAssets'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { imgsDir } from '../consts'
import { Tank } from './Tank'
import { TargetAWD } from './TargetAWD'

export const GRID_SIZE = 60
export const ROWS = 15
export const COLUMS = 30
export const WIDTH = GRID_SIZE * COLUMS + 200
export const HEIGHT = GRID_SIZE * ROWS

export class PlaygroundAWD extends Playground {
  assets: AWDAssets
  composer1: EffectComposer

  tanks: Tank[]

  // grids: Array<{x: number, y: number}>

  constructor(el: HTMLElement, assets: AWDAssets) {
    super(el)
    // this.fog = null
    this.assets = assets

    this.background = assets.cubeTexture

    this.ambientLight.intensity - 0.5

    // this.bloomPass.threshold = 0.5

    this.camera.fov = 70
    this.camera.position.y = 800
    this.camera.position.z = 600

    Panel.camera = this.camera

    const pg = new PlaneBufferGeometry(WIDTH, HEIGHT)
    pg.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2))
    const normalMap = new TextureLoader().load(`${imgsDir}/plane-map.png`)
    const pm = new MeshStandardMaterial({
      color: 0x666666,
      roughness: 0.6,
      side: DoubleSide,
      normalMap
    }) 
    const plane = new Mesh(pg, pm)

    const pm1 = pm.clone()
    pm1.map = new TextureLoader().load(`${imgsDir}/shadow.png`)
    const plane1 = new Mesh(pg, pm1)
    plane1.position.set(400, -50, 200)

    const pm2 = pm.clone()
    pm2.map = new TextureLoader().load(`${imgsDir}/shadow-1.png`)
    const plane2 = new Mesh(pg, pm2)
    plane2.scale.set(2, 1, 3.2)
    plane2.position.set(0, -100, 0)

    this.add(plane, plane1, plane2)

    // 网格
    const gridGmt = new PlaneBufferGeometry(GRID_SIZE, GRID_SIZE)
    gridGmt.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2))
    const grid = new LineSegments(
      new EdgesGeometry(gridGmt, 0.1),
      new LineBasicMaterial({ color: 0x2937ff, blending: AdditiveBlending, transparent: true, opacity: 0.15 })
    )
    // this.add(grid)
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMS; j++) {
        const g = grid.clone()
        g.position.x = j * GRID_SIZE - WIDTH / 2 + GRID_SIZE / 2 + 200
        g.position.z = i * GRID_SIZE - HEIGHT / 2 + GRID_SIZE / 2
        g.position.y = 1
        this.add(g)
      }
    }

    const blueLight = new PointLight(0x2937ff, 2.5, 1500)
    const blueLight1 = new PointLight(0x2937ff, 2.5, 1500)
    const redLight = new PointLight(0xff0000, 1.3, 900)
    const redLight1 = new PointLight(0xff0000, 1.3, 900)
    const whiteLight = new PointLight(0xffffff, 0.03, 3000)
    

    blueLight.position.set(1000, 600, -400)
    blueLight1.position.set(1000, 600, 400)
    blueLight.decay = 1

    redLight.position.set(-1000, 300, -250)
    redLight1.position.set(-1000, 300, 250)

    whiteLight.position.set(0, 1000, 500)
    
    this.add(redLight, redLight1, blueLight, blueLight1, whiteLight)
    // this.add(
    //   new PointLightHelper(blueLight, 50),
    //   new PointLightHelper(blueLight1, 50),
    //   new PointLightHelper(redLight, 50),
    //   new PointLightHelper(redLight1, 50),
    //   new PointLightHelper(whiteLight, 50)
    // )
    
    this.controls.autoRotate = false
    this.camera.lookAt(0, 300, 0)

    this.controls.zoomSpeed = 0

    // 另一台摄像机
    const w = 280
    const h = 180
    const camera1 = new PerspectiveCamera(70, w / h, 1, 4000)
    camera1.position.set(0, 900, 900)
    camera1.lookAt(0, -100, 0)
    const renderer1 = new WebGLRenderer({ antialias: false })
    renderer1.setSize(w, h)
    const scenePass1 = new RenderPass(this, camera1)
    this.composer1 = new EffectComposer(renderer1)
    const filmPass = new FilmPass(0.01, 0.5, 180, 1)
    this.composer1.passes = [scenePass1, filmPass]
    const renderDom = renderer1.domElement
    renderDom.classList.add('awd-sm-renderer')
    this.el.appendChild(renderDom)

    const tank1 = new Tank(assets.zhancheObj)
    tank1.position.set(-900, 0, -150)
    const tank2 = new Tank(assets.zhancheObj)
    tank2.position.set(-900, 0, 0)
    const tank3 = new Tank(assets.zhancheObj)
    tank3.position.set(-900, 0, 150)
    this.add(tank1, tank2, tank3)
    this.tanks = [tank1, tank2, tank3]

    this.resize()
    this.animate()
  }

  attack(target: TargetAWD) {
    const { tanks } = this
    let i = 0
    function atk() {
      setTimeout(() => {
        const t = tanks[i]
        if (t) {
          t.toAttack(target)
          i += 1
          atk()
        }
      }, 500)
    }
    atk()
    target.beAttack()
  }

  animate() {
    super.animate()
    this.composer1.render()
  }
}