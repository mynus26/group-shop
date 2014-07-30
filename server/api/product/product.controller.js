/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /product             ->  index
 
 */

'use strict';

var _ = require('lodash');
var http = require('http');

// Get list of carts
exports.index = function(req, res) {
 
var options = {
//host:'www.google.com',
//port:80,
host: 'api.remix.bestbuy.com',
//path: '/index.html',

path:'/v1/products(search=tv*&manufacturer=Samsung)?format=json&show=longDescription,shortDescription,customerReviewCount,customerReviewAverage,sku,name,image,salePrice,thumbnailImage&apiKey=bckq8793syv9gnv6jynds25g',
agent: false
};
http.get(options,function(http_res){
var http_data = "";
http_res.on("data",function(chunk){
http_data += chunk;
});
http_res.on("end",function(){
//console.log(http_data);
var jsonData = JSON.parse(http_data);
res.send(jsonData);
});
}).on("error",function(err){
res.send('Error while getting data '+ err.message);
//res.send(http_data);
});
//res.send('Data is being sent');
}
