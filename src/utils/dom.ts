export function h (tagName = 'div'): HTMLElement {
  return document.createElement(tagName)
}

export function qs (selector: string): Element {
  return document.querySelector(selector)
}