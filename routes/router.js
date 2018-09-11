const notFound = require('./notFound');
const user = require('./user');
const token = require('./token');

// Define the request router
module.exports = {
  default: notFound,
  user,
  token,
};
