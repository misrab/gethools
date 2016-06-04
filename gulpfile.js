var gulp = require('gulp');
var argv = require('yargs').argv;

var lib = require('./lib');


// @param args[0] input filename e.g. "in.sol"
// @param args[1] output file name e.g. "out.sol"
// e.g. gulp combine --input testdata/sample.sol --output testdata/out.sol
gulp.task('combine', function() {
  if (!argv.input || !argv.output) {
    console.log("Please provide --input and --output file names");
    return;
  }

  lib.combine(argv.input, argv.output);
});
