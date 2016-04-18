'use strict';

var Web3 = require('web3');
var MyStuff_ABI = require('./myStuff.abi');
var MyStuff_Address = '0xe317B83305b3C809e5AE23eA07Cfe64213e1d64A';
var myStuffModel = require('./myStuff.model');

function getContract(cb) {
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  var MyStuff = web3.eth.contract(MyStuff_ABI);
  web3.eth.getCoinbase(function(err, coinbase) {
    cb(err, {
      coinbase: coinbase,
      instance: MyStuff.at(MyStuff_Address)
    });
  });
}

function register(key, cb) {
  getContract(function(err, contract) {
    if (err) { return cb(err); }
    var txnObj = {
      from: contract.coinbase,
      to: MyStuff_Address,
      value: '0x00'
    };
    contract.instance.registerStuff(key, txnObj, cb);
  });
}

function getKey(cb) {
  getContract(function(err, contract) {
    if (err) { return cb(err); }
    contract.instance.keys(contract.coinbase, cb);
  });
}

module.exports = {
  register: register,
  getKey: getKey,
  model: myStuffModel
};