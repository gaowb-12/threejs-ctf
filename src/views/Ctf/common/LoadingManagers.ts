import { LoadingManager } from 'three'
import { h } from '../utils/dom'

const loadUI = h('div')
const loadText = h('div')
loadUI.appendChild(loadText)
loadUI.className = 'load-ui'
loadUI.id = 'load-ui'

const AssetsLoadingManager = new LoadingManager()

AssetsLoadingManager.onStart = () => {
  document.body.appendChild(loadUI)
  loadText.innerHTML = `<div>LOADING... 0%</div>`
}
AssetsLoadingManager.onProgress = (url, loaded, total) => {
  loadUI.innerHTML = `<div>LOADING... ${(loaded / total * 100).toFixed(2)}%</div>`
}
AssetsLoadingManager.onLoad = () => {
  console.log('assets loaded.')
  loadText.innerHTML = '<div>LOADING... 100%</div>'
  loadUI.style.opacity = '0'
  setTimeout(() => document.body.removeChild(loadUI), 5000)
}
AssetsLoadingManager.onError = (url) => {
  console.log('load assets error.')
  loadText.innerHTML = `<div>Load assets error: ${url}</div>`
}

export { AssetsLoadingManager }
