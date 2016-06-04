/*
  combine.js

  // NOT doing below for now
  // assuming no duplicates in imports
  (1) takes input and first concatenates all the import statements
  (2) then scans the whole for duplicate imports and makes sure each is as
  early as possible
  (3) fills non-duplicate imports and returns overall output
*/


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
// Notes:
// - all .sol files need to be in the same folder
exports.combine = function(input, output) {
  console.log("Running combine...");

  var dir = process.cwd() + "/" + input.split("/").slice(0, -1).join("/");
  input = path.basename(input);
  output = path.basename(output);
  output = dir + "/" + output;


  // we'll maintain a list of files to merge at end
  // excluding import statements
  var files = [];

  // start with input file
  resolve(dir, input, files);

  // now remove later duplicates
  var duplicates = {};
  var result = [];
  for (var i=0; i<files.length; i++) {
    if (duplicates.hasOwnProperty(files[i])) { continue; }
    duplicates[files[i]] = true;
    result.push(files[i]);
  }

  // now merge the files without the import statements
  // into the output file
  // TODO turn non-input files (i.e. all except last) into interfaces
  mergeFiles(result, output);
}


function mergeFiles(files, output) {
  var strings = "";
  for (var i=0;i<files.length;i++) {
    strings += readFile(files[i]);
  }

  // write strings to the output file
  fs.writeFile(output, strings, function(err) {
      if(err) { return console.log(err); }
      console.log("Output written to " + output);
  });
}

function readFile(fullpath) {
  var contents = fs.readFileSync(fullpath).toString();
  var lines = contents.split("\n");
  var line;
  var output = "";
  for (var i = 0; i < lines.length; i++) {
    line = lines[i];
    if(line.indexOf("import") > -1) { continue; }
    output += "\n" + line;
  }

  return output;
}

// add filename to files list
// add imports as well
function resolve(dir, input, files) {
  var abs = dir + "/" + input; //.split("/").slice(0, -1).join("/");
  files.unshift(abs);

  // now read file and get import statements
  var imports = getImports(abs);

  for (var i=imports.length-1; i>=0; i--) {
    resolve(dir, imports[i], files);
  }
}

// @returns [] imports e.g. ["moo.sol"]
function getImports(fullpath) {
  var result = [];

  var contents = fs.readFileSync(fullpath).toString();
  var lines = contents.split("\n");
  var line;
  for (var i = 0; i < lines.length; i++) {
    line = lines[i];
    if(line.indexOf("import") > -1) {
      // get filename
      var path = line.replace(/[.]/, "").replace(/["]/gi, "").replace(/(import )/,"").substr(1);
      result.push(path);
      continue; // to next line
    }
  }

  return result;
}


// exports.combine = function(args) {
//   // get directory of caller
//   var dir = process.cwd();
//
//   var input = args[0];
//   var output = args[1];
//
//   if (!input) { console.log("Please provide an input"); return; }
//
//   // read input and infer imports if any
//   // var fullpath = dir+"/"+input;
//   dir = dir + "/" + input.split("/").slice(0, -1).join("/");
//   // console.log(dir); return;
//   input = path.basename(input);
//
//
//
//   output = resolveSol(dir,input);
//   console.log(output);
// }


/*
  Internal
*/

// function resolveSol(dir, filepath) {
//   if (!dir || !filepath) {
//     console.log("Error with path");
//     return;
//   }
//
//   var output = "";
//
//   var fullpath = dir + "/" + filepath;
//
//   var contents = fs.readFileSync(fullpath).toString();
//   var lines = contents.split("\n");
//   var line;
//   for (var i = 0; i < lines.length; i++) {
//     line = lines[i];
//     if(line.indexOf("import") > -1) {
//       // get filename
//       var path = line.replace(/[.]/, "").replace(/["]/gi, "").replace(/(import )/,"").substr(1);
//
//       output += "\n" + resolveSol(dir, path);
//       continue; // to next line
//     }
//     output += "\n" + line;
//   }
//
//   return output;
// }
