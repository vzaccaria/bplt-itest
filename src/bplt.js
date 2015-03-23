// var promise = require('bluebird');
var {
  cp
} = require('shelljs')

var path = require('path');

var _module = () => {
  "use strict"

  var deploy = (dir) => {
    var directory = path.resolve(dir)
    cp(`${__dirname}/../files/Dockerfile`, directory)
    process.chdir(directory)
  }

  return {
    deploy
  }

}

module.exports = _module()