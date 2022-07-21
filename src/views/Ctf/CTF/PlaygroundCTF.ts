import { AdditiveBlending, CubeTexture, BoxBufferGeometry, DirectionalLight, DoubleSide, EdgesGeometry, Group, LineBasicMaterial, LineSegments, Matrix4, Mesh, MeshBasicMaterial, MeshLambertMaterial, PerspectiveCamera, PlaneBufferGeometry, PointLight, TextureLoader, Vector3 } from 'three'
import { CTFAssets } from './CTFAssets'
import { Playground } from '../common/Playground'
import { Terrain } from '../common/Terrain'
import { TeamCTF } from './TeamCTF'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { Panel } from '../common/Panel'
import { MapGrid } from './MapGrid'
import { Tween, Easing } from '@tweenjs/tween.js'
import { TargetCTF } from './TargetCTF'
import { imgsDir } from '../consts'

export class PlaygroundCTF extends Playground {
  // 底部雷达扫描
  scan: Mesh
  // 场景所需资源
  assets: CTFAssets
  // 队伍
  teams: TeamCTF[] = []
  teamGroup: Group = new Group()
  // 靶标
  targets: TargetCTF[] = []
  // 特写相机
  focusCamera = new PerspectiveCamera(55, 1, 0.1, 5000)
  // 特写渲染合成
  focusScenePass = new RenderPass(this, this.focusCamera)
  // 当前是否为特写状态
  isFocus = false
  // 当前特写的队伍
  focusTeam!: TeamCTF | null
  // 地图网格
  mapGrid = new MapGrid()
  gridSize = 240

  constructor(el: HTMLElement, assets: CTFAssets) {
    super(el)
    if (!assets) throw new Error('缺少场景资源.')
    this.assets = assets

    Panel.camera = this.camera

    this.resize()

    // 灯光
    const dirLight = new DirectionalLight(0xffffff, 0.7)
    dirLight.position.set(1500, 800, 3000)
    this.add(dirLight)

    const plight1 = new PointLight(0x0090ff, 2, 1000)
    const plight2 = new PointLight(0x00d2ff, 1, 1000)
    plight1.position.set(550, 500, 0)
    plight2.position.set(-550, 500, 0)
    this.add(plight1, plight2)
    // this.add(new PointLightHelper(plight1, 30), new PointLightHelper(plight2, 30))

    // 天空盒
    this.background = assets.cubeTexture as CubeTexture;

    // 地形
    // 几何体边缘材质（线条材质）
    const material = new LineBasicMaterial({ color: 0x006bff, blending: AdditiveBlending })
    // 地形的几何体对象（通过PlaneBufferGeometry对象将几何体分成多个片段）
    const terrainGeometry = new Terrain(assets.heightimg as HTMLImageElement)
    // const simplifyGeometry = new SimplifyModifier().modify(terrainGeometry, 1000)
    // 通过边缘几何体，把几何体对象的边缘展示出来
    const edges = new EdgesGeometry(terrainGeometry, 1)
    const terrain = new LineSegments(edges, material)
    terrain.position.set(0, -300, -300)
    terrain.scale.set(60, 700, 60)
    this.add(terrain)
    
    // 雷达扫描
    const g = new PlaneBufferGeometry(1800, 1800)
    g.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2))
    const m = new MeshBasicMaterial({
      transparent: true,
      blending: AdditiveBlending,
      // 扫描进度贴图
      map: new TextureLoader().load(`${imgsDir}/scan.png`),
      depthWrite: false
    })
    this.scan = new Mesh(g, m)
    this.scan.position.y = -320
    this.add(this.scan)

    const pg1 = new PlaneBufferGeometry(2000, 2000)
    pg1.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2))
    const m1 = new MeshBasicMaterial({
      transparent: true,
      opacity: 0.6,
      blending: AdditiveBlending,
      // 扫描背景贴图
      map: new TextureLoader().load(`${imgsDir}/btm-bg.png`),
      depthWrite: false
    })
    const mesh1 = new Mesh(pg1, m1)
    mesh1.position.y = -321
    this.add(mesh1)

    // 地板
    const pg = new BoxBufferGeometry(5000, 50, 5000)
    const pm = new MeshLambertMaterial({ color: 0x2a3d5c, side: DoubleSide })
    const mesh = new Mesh(pg, pm)
    mesh.position.y = -350
    this.add(mesh)

    // 添加队伍组
    this.add(this.teamGroup)
    
    // 执行雷达扫描动画
    this.animate()
  }

  // 开始设置队伍
  setTeams(teams: TeamCTF[] = []) {
    this.clearTeams()
    teams.forEach(team => this.addTeam(team))
  }

  // 添加队伍
  addTeam(team: TeamCTF) {
    const index = this.teams.length + 1
    const grid = this.mapGrid[index]
    const { x, y } = grid

    const rotationY = -Math.atan2(y, x)
    team.rotation.y = team.initialRotationY = rotationY
    // 设置每个队伍的位置
    team.position.set(x * this.gridSize + this.gridSize / 2, 300, y * this.gridSize + this.gridSize / 2)
    this.teamGroup.add(team)
    this.teams.push(team)
  }
  // 清空全部队伍
  clearTeams() {
    this.teams.forEach(t => {
      this.teamGroup.remove(t)
      t.destroy()
    })
    this.teams = []
  }

  // 开始设置靶标
  setTargets(targets: TargetCTF[] = []) {
    this.clearTargets()
    // 添加靶标
    targets.sort((a, b) => b.score - a.score).forEach(item => this.addTarget(item))
  }

  // 添加靶标模型实例
  addTarget(target: TargetCTF) {
    // 已经存在的靶标数量
    const index = this.targets.length
    
    // 每个靶标对应一个网格位置
    const grid = this.mapGrid[index];
    const { x, y, value } = grid; // x，y的取值范围这里是-10到10
    if (index === 0) {
      // 第一个靶标
      target.scale.set(2, 2, 2);//第一个靶标设置缩放
      target.position.set(0, -800, 0)
    } else {
      // 其余靶标
      // y轴位置固定（高度固定），x、z坐标定位靶标的位置（这里将网格坐标放大了gridSize倍）
      target.position.set(x * this.gridSize + this.gridSize / 2, -800, y * this.gridSize + this.gridSize / 2)
      target.scale.y = value / 100;//其余靶标根据百分比设置缩放
    }
    this.add(target)
    const p = target.position
    // 靶标位置添加动画
    new Tween(p)
      .delay((index + 1) * 50)
      .to({ x: p.x, y: -300, z: p.z }, 1000)
      .easing(Easing.Back.Out)
      .start()
    // const lineMtl = target.line.material as Material
    // lineMtl.opacity = 0.5
    // new Tween(lineMtl)
    //   .delay((index + 1) * 100 + 3000)
    //   .to({ opacity: 0.3 }, 2500)
    //   .start()
    this.targets.push(target)
  }

  // 清除所有靶标
  clearTargets() {
    this.targets.forEach(t => {
      this.remove(t)
      t.destroy()
    })
    this.targets = []
  }

  // 进行特写
  focus(team: TeamCTF) {
    // 是否有正在特写的队伍或者不存在队伍
    if (this.isFocus || !team || this.focusTeam) return
    // 特写当前队伍
    this.focusTeam = team
    Panel.camera = this.focusCamera
    // 切换为特写相机
    this.composer.passes = [this.focusScenePass]
    this.isFocus = true
    this.controls.enabled = false
    // 特写三秒，然后切换为第三人称相机
    setTimeout(this.unFocus.bind(this), 3000)
  }

  // 不进行特写
  unFocus() {
    Panel.camera = this.camera
    // 切换为第三人称相机
    this.composer.passes = [this.scenePass]
    this.focusTeam = null
    this.controls.enabled = true
    // 延迟 3 秒，避免频繁特写
    setTimeout(() => {
      this.isFocus = false
    }, 3000)
  }

  // 更新特写相机
  updateFocusCamera() {
    const { focusTeam, focusCamera } = this
    // 如果特写队伍不存在或者特写队伍没有攻击目标，就不更新
    if (!focusTeam || !focusTeam.target) return
    const p = new Vector3()
    // 获取特写相机的世界坐标保存到p中
    focusTeam.cpos.getWorldPosition(p)
    // 设置特写相机到需要特写的坐标p上
    focusCamera.position.set(p.x, p.y + 100, p.z)
    // 朝向特写队伍
    focusCamera.lookAt(focusTeam.target.position)
  }

  animate() {
    super.animate()
    // 扫描进度开始绕y轴旋转
    this.scan.rotation.y += 0.04
    // 队伍绕y轴旋转
    this.teamGroup.rotation.y -= 0.006
    // 是否存在特写队伍，更新特写相机
    if (this.focusTeam) this.updateFocusCamera()
  }

  resize() {
    super.resize()
    if (this.focusCamera) {
      this.focusCamera.aspect = this.camera.aspect
      this.focusCamera.updateProjectionMatrix()
    }
  }
}