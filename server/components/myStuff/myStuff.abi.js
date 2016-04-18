'use strict';

module.exports = [{
  "constant": true, 
  "inputs": [{"name": "", "type": "address", "typeShort": "address", "bits": "", "displayName": "", "template": "elements_input_address"}], 
  "name": "keys", 
  "outputs": [ { "name": "", "type": "string", "value": "", "displayName": "" } ], 
  "type": "function", "displayName": "keys" 
},{ 
  "constant": false, 
  "inputs": [], 
  "name": "destroy", 
  "outputs": [], 
  "type": "function", 
  "displayName": "destroy"
},{ 
  "constant": true, 
  "inputs": [], 
  "name": "owner", 
  "outputs": [{"name": "", "type": "address", "value": "0x31ae43984401a7519171fc60602ca468aeef4a04", "displayName": "" } ], 
  "type": "function", "displayName": "owner" 
},{ 
  "constant": false, 
  "inputs": [ { "name": "key", "type": "string", "typeShort": "string", "bits": "", "displayName": "key", "template": "elements_input_string" } ], 
  "name": "registerStuff", 
  "outputs": [], 
  "type": "function", 
  "displayName": "register Stuff" 
},{ 
  "constant": false, 
  "inputs": [ { "name": "newOwner", "type": "address", "typeShort": "address", "bits": "", "displayName": "new Owner", "template": "elements_input_address" } ], 
  "name": "transferOwnership", 
  "outputs": [], 
  "type": "function", 
  "displayName": "transfer Ownership" 
},{
  "anonymous": false, 
  "inputs": [ { "indexed": false, "name": "thingOwner", "type": "address" }, { "indexed": false, "name": "key", "type": "string" } ], 
  "name": "StuffRegistered", 
  "type": "event" 
}];
