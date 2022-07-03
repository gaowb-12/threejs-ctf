import { h } from './dom'

export function broadcast(title: string, content: string, duraing = 2000) {
  const el = h('div')
  el.className = 'broadcast in'
  el.innerHTML = `
    <div class="broadcast-title">${title}</div>
    <div class="broadcast-content">${content}</div>`
  document.body.appendChild(el)
  getComputedStyle(el).height
  el.className = 'broadcast'
  setTimeout(() => {
    el.className = 'broadcast out'
    setTimeout(() => {
      document.body.removeChild(el)
    }, 2000)
  }, duraing)
}
