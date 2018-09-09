const notFound = require('./notFound');
const greetings = require('./greetings');
const user = require('./user');

// Define the request router
module.exports = {
  hello: greetings,
  default: notFound,
  user,
};
