#!/usr/bin/env node


var functions = require('./lib');

// get arguments
var program = require('commander');

program
  .version('0.0.1')
  .usage('[options] <function...> <args>')
  .arguments('<functionName> [args...]')
  .action(function(functionName, args) {

    if (!functions[functionName]) {
      console.log('Invalid function name');
      return;
    }

    functions[functionName](args);
  })
  .parse(process.argv);
