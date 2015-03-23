// var promise = require('bluebird');
var {
  cp, exec
} = require('shelljs')

var path = require('path');
var uid = require('uid')
var promise = require('bluebird')
var Logdown = require('logdown')
var logger = new Logdown({
  prefix: "bplt-itest"
})
var log = (logger.log).bind(logger)

var exc = (cmd) => {
  "use strict"
  log(`**Executing**: ${cmd}`);
  return new promise((resolve, reject) => {
    exec(cmd, {
      async: true
    }, (code, output) => {
      if (code !== 0) {
        reject(output)
      } else {
        resolve(output)
      }
    })
  })
}

var _module = () => {
  "use strict"

  var deploy = (dir) => {
    var id = uid(4)
    var name = `tmpimage-${id}`
    var directory = path.resolve(dir)
    log(`**Copying docker file in**: ${directory} `)
    cp('-f', `${__dirname}/../files/Dockerfile`, directory)
    log(`**Changing directory**: ${directory}`)
    process.chdir(directory)
    exc(`docker build -t ${name} .`)
      .then(() => {
        exc(`docker rmi ${name}`)
      })
  }

  return {
    deploy
  }

}

module.exports = _module()