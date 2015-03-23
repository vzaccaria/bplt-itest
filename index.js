#!/usr/bin/env node
"use strict";

require("shelljs");

var _require = require("docopt");

var docopt = _require.docopt;

var _ = require("lodash");
var fs = require("fs");

var _require2 = require("./lib/bplt");

var deploy = _require2.deploy;

var getOption = function (a, b, def, o) {
  "use strict";
  if (_.isString(o[a])) {
    return o[a];
  } else {
    if (_.isString(o[b])) {
      return o[b];
    } else {
      return def;
    }
  }
};

var getOptions = function (doc) {
  "use strict";
  var o = docopt(doc);
  var help = getOption("-h", "--help", false, o);
  var directory = o.SRC;
  return {
    help: help, directory: directory
  };
};

var doc = fs.readFileSync(__dirname + "/docs/usage.md", "utf8");

var main = function () {
  "use strict";

  var _getOptions = getOptions(doc);

  var help = _getOptions.help;
  var directory = _getOptions.directory;

  if (!help) {
    deploy(directory);
  } else {
    printHelp();
  }
};

main();
