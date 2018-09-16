const notFound = require('./notFound');
const user = require('./user');
const token = require('./token');
const pizza = require('./pizza');
const toppings = require('./toppings');
const cart = require('./cart');
const order = require('./order');
const cartItem = require('./cartItem');

// Define the request router
module.exports = {
  default: notFound,
  user,
  token,
  pizza,
  toppings,
  cart,
  order,
  cartItem,
};
