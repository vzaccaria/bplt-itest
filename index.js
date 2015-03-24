#!/usr/bin/env node
"use strict";

require("shelljs");

var _require = require("docopt");

var docopt = _require.docopt;

var _ = require("lodash");
var fs = require("fs");

var _require2 = require("./lib/bplt");

var deploy = _require2.deploy;
var inspect = _require2.inspect;

var getOption = function (a, b, def, o) {
  "use strict";
  if (!_.isUndefined(o[a])) {
    return o[a];
  } else {
    if (!_.isUndefined(o[b])) {
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
  var Inspect = getOption("-i", "--inspect", false, o);
  var Deploy = help === false && Inspect === false;
  var directory = o.SRC;
  return {
    help: help, directory: directory, Inspect: Inspect, Deploy: Deploy
  };
};

var doc = fs.readFileSync(__dirname + "/docs/usage.md", "utf8");

var main = function () {
  "use strict";

  var _getOptions = getOptions(doc);

  var directory = _getOptions.directory;
  var Inspect = _getOptions.Inspect;
  var Deploy = _getOptions.Deploy;

  if (Deploy) {
    deploy(directory);
  } else {
    if (Inspect) {
      inspect(directory);
    }
  }
};

main();
