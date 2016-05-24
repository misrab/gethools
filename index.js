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

// program
//   .arguments('<functionName>')
//   // .option('-u, --username <username>', 'The user to authenticate as')
//   // .option('-p, --password <password>', 'The user\'s password')
//   .action(function(functionName) {
//     //  console.log('user: %s pass: %s file: %s',
//     //      program.username, program.password, file);
//     console.log(functionName);
//     if (!functions[functionName]) {
//       console.log('Invalid function name');
//       return;
//     }
//   })
//   .parse(process.argv);


// console.log('Hello, world!');
