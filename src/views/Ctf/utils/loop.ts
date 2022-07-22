export function loop(option: { interval: number, times: number, callback: ()=>void, onStart?: ()=>void, onEnd?: ()=>void }) {
  let _times = option.times || 1 ;// 循环次数
  let timer:number | undefined
  function fn() {
    option.callback()
    timer = setTimeout(() => {
      _times -= 1
      if (_times <= 0) {
        // 循环结束
        clearTimeout(timer)
        option.onEnd && option.onEnd()
      } else {
        // 一直执行
        option.callback()
        fn()
      }
    }, option.interval)
  }
  option.onStart && option.onStart()
  fn()
}