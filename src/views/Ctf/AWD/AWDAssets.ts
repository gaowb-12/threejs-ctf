import { BufferGeometry, CubeTexture, CubeTextureLoader, Geometry, Material, Matrix4, Mesh } from 'three'
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2'
import { AssetsLoadingManager } from '../common/LoadingManagers'
import { imgsDir, modelsDir } from '../consts'

export interface AWDAssets {
  buildings: Array<BufferGeometry | Geometry>,
  // heightimg?: HTMLImageElement,
  cubeTexture?: CubeTexture
  plane1?: Mesh,
  zhancheObj?: Mesh,
  zhancheMtl?: Material
}

export class AWDAssetsLoader {
  static async load(): Promise<AWDAssets> {
    return new Promise((resolve) => {
      const assets: AWDAssets = {
        buildings: []
      }
    
      let count = 7
    
      function callback() {
        count -= 1
        if (!count) resolve(assets)
      }

      new CubeTextureLoader(AssetsLoadingManager).load(Array(6).fill(`${imgsDir}/bg.jpg`), cubeTexture => {
        assets.cubeTexture = cubeTexture
        callback()
      })
      new OBJLoader2(AssetsLoadingManager).load(`${modelsDir}/2.obj`, obj => {
        const mesh = obj.children[0] as Mesh
        assets.buildings.push(mesh.geometry)
        callback()
      })
      new OBJLoader2(AssetsLoadingManager).load(`${modelsDir}/3.obj`, obj => {
        const mesh = obj.children[0] as Mesh
        assets.buildings.push(mesh.geometry)
        callback()
      })
      new OBJLoader2(AssetsLoadingManager).load(`${modelsDir}/4.obj`, obj => {
        const mesh = obj.children[0] as Mesh
        assets.buildings.push(mesh.geometry)
        callback()
      })
      new OBJLoader2(AssetsLoadingManager).load(`${modelsDir}/5.obj`, obj => {
        const mesh = obj.children[0] as Mesh
        assets.buildings.push(mesh.geometry)
        callback()
      })
      new OBJLoader2(AssetsLoadingManager).load(`${modelsDir}/6.obj`, obj => {
        const mesh = obj.children[0] as Mesh
        const geometry = mesh.geometry
        // 这个模型不是居中的，在这里调整一下
        geometry.applyMatrix4(new Matrix4().makeTranslation(-750, 0, -60))
        assets.buildings.push(geometry)
        callback()
      })
      new OBJLoader2(AssetsLoadingManager).load(`${modelsDir}/zhanche.obj`, obj => {
        const mesh = obj.children[0] as Mesh
        assets.zhancheObj = mesh
        callback()
      })
      // new MaterialLoader(AssetsLoadingManager).load(`${modelsDir}/zhanche.mtl`, mtl => {
      //   assets.zhancheMtl = mtl
      //   callback()
      // })
    })
  }
}