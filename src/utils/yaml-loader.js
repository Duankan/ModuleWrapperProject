var loaderUtils = require('loader-utils')
// let fs = require('fs')
let yaml = require('js-yaml')
module.exports = function (source) {
  // let self = this
  console.log('start process parse yaml...')
  var options = loaderUtils.getOptions(this) || {}
  if (options) {}
  let result = JSON.stringify(yaml.load(source))
  console.log(result)
  return 'module.exports = ' + result + ';'
}
