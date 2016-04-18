'use strict';

angular.module('myStuff').factory('web3', function() {
  
  return (typeof web3 !== 'undefined') ? new Web3(web3.currentProvider) : new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); 
});

