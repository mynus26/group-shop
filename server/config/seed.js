/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');


Thing.find({}).remove(function() {
  Thing.create({
    name : 'Collaborative Shopping',
    info : 'Shop together with your family and Save time.'
  }, {
    name : 'Share your cart privately',
    info : 'You can share your cart privately with Family/Friends.'
  }, {
    name : 'Admin of shared cart',
    info : 'You can add necessary authorization to individual persons. They can add/remove items or just view and add comments to your cart.'
  },  {
    name : 'Social Integration',
    info : 'Integration with Facebook, Twitter and Google. Add people from popular sites.'
  },  {
    name : 'Payment Integration',
    info : 'Various payment options including PayPal and Google Wallet.'
  },{
    name : 'Share shopping costs',
    info : 'When you pay you can share costs based on rulues i.e. all share equally or based on items they added.'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});