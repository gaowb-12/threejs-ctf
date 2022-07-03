export function loop(option: { interval: number, times: number, callback: ()=>void, onStart?: ()=>void, onEnd?: ()=>void }) {
  let _times = option.times || 1
  let timer:number | undefined
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