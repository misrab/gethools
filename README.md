# gethools
tools for geth dapp development


# setup

We expect `geth` to be installed with a ~/geth/test_genesis.json genesis block.
This block will have one account with a bunch of ether.

For simulation, accounts are programmatically created and sent ether from this
address. This is to simplify the genesis block, make simulation more scalable,
and make a recovery simple (i.e. create new account and replace initial
address in genesis block).


# commands

`gulp combine --input --output`

`gulp geth`
