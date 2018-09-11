/*
 * Helpers for various tasks
 *
 */

// Dependencies
const crypto = require('crypto');
const config = require('../config/enviroments');

// Container for all the helpers
const helpers = {};

helpers.createRandomString = (strLength, randomString) => {
  const possibleChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const deltaRandom = typeof randomString !== 'undefined'
    ? randomString + possibleChars.charAt(Math.round(Math.random() * possibleChars.length))
    : '';
  return strLength ? helpers.createRandomString(strLength - 1, deltaRandom) : deltaRandom;
};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = (str) => {
  let obj = {};
  try {
    obj = JSON.parse(str);
  } catch (e) {
    console.log(e);
  }
  return obj;
};

// Create a SHA256 hash
helpers.hash = str => ((typeof (str) === 'string' && str.length > 0)
  ? crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex')
  : false);

helpers.minimumLength = (data, len) => (data.length > len ? data : '');
helpers.isString = data => (typeof (data) === 'string' ? data : '');
helpers.isBoolean = data => typeof (data) === 'boolean';


// Export the module
module.exports = helpers;
