/*
  Imports
*/

fs = require('fs');
readline = require('readline');
path = require('path');


/*
  External
*/


// @notice combine all solidity files in current folder and below to one,
// through "import ./...sol" statements
// @param args[0] input filename e.g. "in.sol"
// @param args[1] output file name e.g. "out.sol"
exports.combine = function(args) {
  // get directory of caller
  var dir = process.cwd();

  var input = args[0];
  var output = args[1];

  if (!input) { console.log("Please provide an input"); return; }

  // read input and infer imports if any
  // var fullpath = dir+"/"+input;
  dir = dir + "/" + input.split("/").slice(0, -1).join("/");
  // console.log(dir); return;
  input = path.basename(input);



  output = resolveSol(dir,input);
  console.log(output);
}


/*
  Internal
*/

function resolveSol(dir, filepath) {
  if (!dir || !filepath) {
    console.log("Error with path");
    return;
  }

  var output = "";

  var fullpath = dir + "/" + filepath;

  var contents = fs.readFileSync(fullpath).toString();
  var lines = contents.split("\n");
  var line;
  for (var i = 0; i < lines.length; i++) {
    line = lines[i];
    if(line.indexOf("import") > -1) {
      // get filename
      var path = line.replace(/[.]/, "").replace(/["]/gi, "").replace(/(import )/,"").substr(1);

      output += "\n" + resolveSol(dir, path);
      continue; // to next line
    }
    output += "\n" + line;
  }

  return output;
}

//
//
// // input file name
// // cb(line)
// function readLines(input, lineCb, endCb) {
//   var readStream = fs.createReadStream(input);
//   readStream.on('error', function(err) {
//     console.log(err);
//   });
//
//   var lineReader = readline.createInterface({
//     input: fs.createReadStream(input)
//   });
//
//   lineReader.on('line', lineCb);
//   lineReader.on('close', endCb);
// };
//
// function resolveSol(dir, filepath) {
//   if (!dir || !filepath) {
//     console.log("Error with path");
//     return;
//   }
//   var fullpath = dir + "/" + filepath;
//
//   // console.log(fullpath); return;
//   // this will be the full output string
//   var output;
//
//
//   readLines(fullpath, function(line) {
//     // console.log(line);
//     // filter imports
//     // if(line.indexOf("import") > -1) {
//     //
//     //   // get filename
//     //   // var filename = path.basename(line.replace(/(import )("")/, ""));
//     //   var path = line.replace(/[.]/, "").replace(/["]/gi, "").replace(/(import )/,"").substr(1);
//     //   // console.log(line.replace(/[.]/, "").replace(/["]/gi, "").replace(/(import )/,"").substr(1));
//     //   resolveSol(dir, path);
//     //   // output += resolveSol(dir, path)
//     //   return; // to next line
//     // }
//
//     // else just add to output
//     output += line;
//   }, function() {
//     return output;
//   });
//
//   // return the output
//   // return output;
// }
