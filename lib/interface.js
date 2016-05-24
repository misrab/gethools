fs = require('fs');


exports.Square = function(args) {
  console.log("sq");
}

// @notice combine all solidity files in current folder and below to one,
// through "import ./...sol" statements
// @param args[0] input filename e.g. "in.sol"
// @param args[1] output file name e.g. "out.sol"
exports.combine = function(args) {
  // get directory of caller
  var dir = process.cwd();

  var input = args[0];
  var output = args[1];


  // read input and infer imports if any
  resolveSol(dir, input);
}


function resolveSol(dir, filename) {
  fs.readFile(dir+"/"+filename, 'utf8', function (err, data) {
    if (err) { return console.log(err); }
    
  });
}
