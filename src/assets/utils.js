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

export function randomNumber (from = 0, to = 10) { // 此处不要用round 会导致随机值分布不均
  let min = Math.ceil(from) // 返回 >= from的整数
  let max = Math.floor(to)  // 返回 <= to的整数

  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function css (element, o) {
  if (!element) {
    return false
  }

  if (o && (this.getType(o) === 'object') && JSON.stringify(o) !== '{}') { // 传入对象且对象不为空
    for (let attr in o) {
      element.style[attr] = o[attr]
    }
  } else if (o && (this.getType(o) === 'string')) {
    return window.getComputedStyle(element, null).getPropertyValue(o)
  }
}

export function getType (target) {
  let types = {}
  let temp = Object.prototype.toString.call(target)
  // types映射类型
  'Boolean Number String Function Array Date RegExp Object Error NodeList'.split(' ').map(function (value, index) {
    types[`[object ${value}]`] = value.toLowerCase()
  })

  if (types[temp]) {
    return types[temp]
  } else if (temp.indexOf('HTML') !== -1) {
    return 'element'
  } else {

  }
}
