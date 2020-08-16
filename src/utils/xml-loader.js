var loaderUtils = require('loader-utils')
const parseString = require('xml2js').parseString
/**
     * 判断对象类型
     * @param {any} obj 对象
     */
function typeOf (obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

/**
 * 对象深度遍历，并做类型推断转换(Boolean和Number)
 * @param {any} data 要遍历的对象
 */
function deepNativeType (data) {
  const t = typeOf(data)
  let o
  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return nativeType(data)
  }
  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepNativeType(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepNativeType(data[i])
    }
  }
  return o
}

/**
 * 推断数据类型(Boolean和Number)，并转换为对应类型值
 * @param {any} value
 */
function nativeType (value) {
  if (!value) return value

  let n = Number(value)
  if (!isNaN(n)) {
    return n
  }
  let b = value.toLowerCase()

  if (b === 'true') {
    return true
  } else if (b === 'false') {
    return false
  }
  return value
}
module.exports = function (source) {
  console.log('start process parse xml...')
  var options = loaderUtils.getOptions(this) || {}
  if (options !== {}) {}
  let self = this
  parseString(source, options, function (err, source) {
    // 去掉根元素
    if (options.xmlRoot && source[options.xmlRoot]) {
      source = source[options.xmlRoot]
    }
    // 类型推断转换(Boolean和Number)
    if (options.conclusionType) {
      source = deepNativeType(source)
    }
    console.log(JSON.stringify(source))
    self.callback(err, !err && 'module.exports = ' + JSON.stringify(source))
  })
}
