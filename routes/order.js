const dataAccess = require('../lib/data');
const helpers = require('../lib/helpers');
const tokenUtil = require('../lib/tokenUtils');

/*
POST /order: Order the shopping cart content
*/


const acceptableMethods = ['post', 'delete'];
const order = {};



order.post = (data, callback) => {

};
order.delete = (data, callback) => {

};



module.exports = (dataIn, callbackIn) => ((acceptableMethods.indexOf(dataIn.method) > -1)
  ? order[dataIn.method](dataIn, callbackIn)
  : callbackIn(405));
