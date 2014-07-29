'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CartSchema = new Schema({
  name: String,
  owner: { type: String, lowercase: true },
  sharedWith: [{ type: String, lowercase: true }],
  items: [{	id:Number,
  			name:String,
  			price:Number,
  			quantity:Number,
        owner:String,
  		  }],
  shared: {type: Boolean, default:false}
});

module.exports = mongoose.model('Cart', CartSchema);