const dataAccess = require('../lib/data');
const helpers = require('../lib/helpers');

const acceptableMethods = ['get'];
const pizza = {};

pizza.get = (data, callback) => {
  dataAccess.read('menu/list.json')
    .then(pizzaInfo => callback(200, helpers.parseJsonToObject(pizzaInfo).pizzas))
    .catch(err => callback(400, { Error: err.code }));
};

module.exports = (dataIn, callbackIn) => ((acceptableMethods.indexOf(dataIn.method) > -1)
  ? pizza[dataIn.method](dataIn, callbackIn)
  : callbackIn(405));
