export function loop(option: { interval: number, times: number, callback: Function, onStart?: Function, onEnd?: Function }) {
  let _times = option.times || 1
  let timer
  function fn() {
    option.callback()
    timer = setTimeout(() => {
      _times -= 1
      if (_times <= 0) {
        clearTimeout(timer)
        option.onEnd && option.onEnd()
      } else {
        option.callback()
        fn()
      }
    }, option.interval)
  }
  option.onStart && option.onStart()
  fn()
}