var gulp = require('gulp');
var argv = require('yargs').argv;

var lib = require('./lib');



var shell = require('gulp-shell');



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

// geth --genesis ~/geth/test_genesis.json --port "30304" --networkid 9347  --datadir ~/.misrab_testnet --nodiscover --maxpeers 0  --rpcport "8546" --rpc --rpccorsdomain "http://localhost:3000" console 2>> test.log

gulp.task('geth', shell.task([
  'mv ~/.misrab_testnet/keystore/UTC--2016-06-05T07-33-51.586286128Z--939cdcccc1b84523e77a8964c5d8de7cdc2e8a41 ~/UTC--2016-06-05T07-33-51.586286128Z--939cdcccc1b84523e77a8964c5d8de7cdc2e8a41',
  'rm -rf ~/.misrab_testnet',
  'mkdir ~/.misrab_testnet',
  'mkdir ~/.misrab_testnet/keystore',
  'mv ~/UTC--2016-06-05T07-33-51.586286128Z--939cdcccc1b84523e77a8964c5d8de7cdc2e8a41 ~/.misrab_testnet/keystore/UTC--2016-06-05T07-33-51.586286128Z--939cdcccc1b84523e77a8964c5d8de7cdc2e8a41',
  'geth --mine --genesis ~/geth/test_genesis.json --port "30304" --networkid 9347  --datadir ~/.misrab_testnet --nodiscover --maxpeers 0  --rpcport "8546" --rpc --rpcapi "eth,web3,personal" --rpccorsdomain "http://localhost:3000" 2>> test.log',
]));
