

function mergeObj(a, b) {
  for (k in b) {
    a[k] = b[k];
  }
}
var result = {};

mergeObj(result, require("./combine.js"));
mergeObj(result, require("./interface.js"));
mergeObj(result, require("./geth.js"));

// console.log(result);

module.exports = result; //.interface = require("./interface.js");
