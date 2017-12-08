/**
 * rem适配body字体
 * @param  {Number} _client 传入适配的参考标准，默认参考为320
 */
export function remFontSize (_client = 320) {
  let docEl = document.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 10 * (clientWidth / _client) + 'px'
  }
  if (!document.addEventListener) return
  window.addEventListener(resizeEvt, recalc, false)
  document.addEventListener('DOMContentLoaded', recalc, false)
}
