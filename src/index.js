var shelljs = require('shelljs')
var {
  docopt
} = require('docopt')
var promise = require('bluebird')
var _ = require('lodash')
var fs = require('fs')

var getOption = (a, b, def, o) => {
  if (_.isString(o[a])) {
    return o[a]
  } else {
    if (_.isString(o[b])) {
      return o[b]
    } else {
      return def
    }
  }
}


var getOptions = doc => {
  var o = docopt(doc)
  var help = getOption('-h', '--help', false, o)
  return {
    help
  }
}

var doc = fs.readFileSync(__dirname + "/docs/usage.md", 'utf8')

var main = () => {
  var { help } = (getOptions(doc))
}

main()
