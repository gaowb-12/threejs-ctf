import { AmbientLight, FogExp2, PerspectiveCamera, Scene, Vector2, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { update as TweenUpdate } from '@tweenjs/tween.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
// import { Stats } from '../utils/stats'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Panel } from './Panel'

export class Playground extends Scene{
  el: HTMLElement
  // 环境光
  ambientLight = new AmbientLight(0xffffff, 0.3)
  // 摄像机
  camera = new PerspectiveCamera(72, 1, 0.1, 5000)
  // 渲染器
  renderer = new WebGLRenderer({ antialias: true })
  // 场景渲染
  scenePass = new RenderPass(this, this.camera)
  // 泛光效果
  // bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1, 1.2, 0.23)
  // faxx 抗锯齿
  // fxaaPass = new ShaderPass(FXAAShader)
  // 合成器
  composer = new EffectComposer(this.renderer)
  // 交互控制器
  controls: OrbitControls
  // 是否已暂停
  isPaused = false
  // 帧率
  stats = new (Stats as any)()

  // 鼠标位置
  static mouse = new Vector2()
  // static raycaster = new Raycaster()

  constructor(el: HTMLElement) {
    super()
    this.el = el
    this.el.classList.add('playground-canvas')
    this.controls = new OrbitControls(this.camera, el)
    this.init()
  }

  init () {
    const { renderer, camera, el, controls, composer, stats } = this
    el.appendChild(renderer.domElement)

    this.renderer.shadowMap.enabled = true

    camera.position.z = 1000
    camera.position.y = -100
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
    camera.updateMatrixWorld(true)
    // 雾效果
    this.fog = new FogExp2(0x0f1022, 0.0008)
    // 环境光
    this.add(this.ambientLight)

    composer.passes = [this.scenePass]

    controls.minDistance = 500
    controls.maxDistance = 1600
    controls.enabled = true
    controls.autoRotate = true
    controls.autoRotateSpeed = 1
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.maxPolarAngle = Math.PI * 0.57

    // 帧率
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.top = 0
    this.el.appendChild(stats.domElement)
    
    window.addEventListener('resize', this.resize.bind(this))
    // document.addEventListener('visibilitychange', e => this.isPaused = document.hidden)
    // window.addEventListener('mousemove', this.onMousemove.bind(this))
  }

  animate() {
    if (!this.isPaused) requestAnimationFrame(this.animate.bind(this))
    this.stats.update()
    this.controls.update()
    // 靶标动画
    TweenUpdate()
    // 靶标提示标签动画
    Panel.update()
    // 通过后期处理通道合成
    this.composer.render()
  }

  resize() {
    const { clientWidth, clientHeight } = this.el
    this.camera.aspect = clientWidth / clientHeight
    this.renderer.setSize(clientWidth, clientHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // this.bloomPass.resolution.set(clientWidth / 2, clientHeight / 2)
    // this.fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / (clientWidth * window.devicePixelRatio);
    // this.fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / (clientHeight * window.devicePixelRatio);
    this.composer.setSize(clientWidth, clientHeight)
    this.camera.updateProjectionMatrix()
  }

  // onMousemove(event: MouseEvent) {
  //   const { clientWidth, clientHeight } = this.el
  //   const { clientX, clientY } = event
  //   const { mouse, raycaster } = Playground
  //   mouse.x = clientX / clientWidth * 2 - 1
  //   mouse.y = clientY / clientHeight * 2 - 1
  //   raycaster.setFromCamera(mouse, this.camera)
  //   const object = raycaster.intersectObjects(this.children)
  //   console.log(object[0]?.object.uuid)
  // }
}