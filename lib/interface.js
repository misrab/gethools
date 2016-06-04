/*
  Imports
*/

fs = require('fs');
readline = require('readline');
path = require('path');


/*
  External
*/


// @notice turns a given .sol into interfaces except for
// `args[2]` contract
// does not do import resolution
// through "import ./...sol" statements
// @param args[0] input filename e.g. "in.sol"
// @param args[1] output file name e.g. "out.sol"
// @param args[2] contract name to NOT interface e.g. "Swap"
exports.interface = function(args) {
  // get directory of caller
  var dir = process.cwd();

  var input = args[0].trim();
  var output = args[1].trim();
  var exception = args[2].trim();

  if (!input) { console.log("Please provide an input"); return; }

  // read input and infer imports if any
  var fullpath = dir+"/"+input;
  var output = toInterface(fullpath, exception);

  // dir = dir + "/" + input.split("/").slice(0, -1).join("/");
  // // console.log(dir); return;
  // input = path.basename(input);
  //
  //
  //
  // output = resolveSol(dir,input);
  // console.log(output);
}


/*
  Internal
*/


function toInterface(fullpath, exception) {
  var contents = fs.readFileSync(fullpath).toString();
  var lines = contents.split("\n");
  var line, name;
  for (var i = 0; i < lines.length; i++) {
    line = lines[i];
    // scan for contract name
    if(line.indexOf("contract") > -1) {
      name = line.split(" ")[1].replace(/[{}]/,"").trim();
      // if (nam)
    }
  }
}
