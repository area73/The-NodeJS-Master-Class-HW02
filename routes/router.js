const notFound = require('./notFound');
const user = require('./user');
const token = require('./token');
const pizza = require('./pizza');
const toppings = require('./toppings');

// Define the request router
module.exports = {
  default: notFound,
  user,
  token,
  pizza,
  toppings
};
