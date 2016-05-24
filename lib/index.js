// var normalizedPath = require("path").join(__dirname, "");
//
// var result = {};
//
// require("fs").readdirSync(normalizedPath).forEach(function(file) {
//   require("./" + file);
// });
//
//
// results.moo = "foo";
//
// export results;

function mergeObj(a, b) {
  for (k in b) {
    a[k] = b[k];
  }
}
var result = {};

mergeObj(result, require("./interface.js"));

// console.log(result);

module.exports = result; //.interface = require("./interface.js");
