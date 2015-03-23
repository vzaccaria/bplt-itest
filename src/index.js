require('shelljs')
var {
  docopt
} = require('docopt')
var _ = require('lodash')
var fs = require('fs')
var {
  deploy
} = require('./lib/bplt');

var getOption = (a, b, def, o) => {
  "use strict"
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
  "use strict"
  var o = docopt(doc)
  var help = getOption('-h', '--help', false, o)
  var directory = o.SRC
  return {
    help, directory
  }
}

var doc = fs.readFileSync(__dirname + "/docs/usage.md", 'utf8')

var main = () => {
  "use strict"
  var {
    help, directory
  } = (getOptions(doc))
  if (!help) {
    deploy(directory)
  }
}

main()