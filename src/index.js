require('shelljs')
var {
  docopt
} = require('docopt')
var _ = require('lodash')
var fs = require('fs')
var {
  deploy, inspect
} = require('./lib/bplt');

var getOption = (a, b, def, o) => {
  "use strict"
  if (!_.isUndefined(o[a])) {
    return o[a]
  } else {
    if (!_.isUndefined(o[b])) {
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
  var Inspect = getOption('-i', '--inspect', false, o)
  var Deploy = (help === false) && (Inspect === false)
  var directory = o.SRC
  return {
    help, directory, Inspect, Deploy
  }
}

var doc = fs.readFileSync(__dirname + "/docs/usage.md", 'utf8')

var main = () => {
  "use strict"
  var {
    directory, Inspect, Deploy
  } = (getOptions(doc))
  if (Deploy) {
    deploy(directory)
  } else {
    if (Inspect) {
      inspect(directory)
    }
  }
}

main()