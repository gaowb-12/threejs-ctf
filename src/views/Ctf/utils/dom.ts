export function h (tagName = 'div'): HTMLElement {
  return document.createElement(tagName)
}

export function qs (selector: string): Element|null {
  return document.querySelector(selector)
}