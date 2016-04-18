'use strict';

var mongoose = require('mongoose');

var MyStuffSchema = new mongoose.Schema({
  userId: String,
	items: Array
});

module.exports = mongoose.model('MyStuff', MyStuffSchema);