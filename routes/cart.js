const dataAccess = require('../lib/data');
const helpers = require('../lib/helpers');
const tokenUtil = require('../lib/tokenUtils');

/*
GET /cart: Get the shopping cart.
DELETE /cart: Remove the shopping cart
*/


const acceptableMethods = ['get', 'delete', 'post'];
const cart = {};
const cartDir = 'cart';


cart.get = (data, callback) => {
  const phone = helpers.minimumLength(helpers.isString(data.queryStringObject.phone).trim(), 8);
  const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
  if (phone && token) {
    // Verify that the given token is valid for the phone number
    tokenUtil.verify(token, phone)
      .then(() => {
        dataAccess.read(`${cartDir}/${phone}`)
          .then(cartInfo => callback(200, helpers.parseJsonToObject(cartInfo)))
          .catch(err => callback(400, { Error: err.code }));
      })
      .catch(() => callback(400, { Error: 'no valid phone / token combination' }));
  } else {
    callback(400, { Error: 'required fields needed (phone , token)' });
  }
};


cart.delete = (data, callback) => {
  const phone = helpers.minimumLength(helpers.isString(data.payload.phone).trim(), 8);
  const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
  if (phone && token) {
    tokenUtil.verify(token, phone)
      .then(() => {
        dataAccess.read(`${cartDir}/${phone}`)
          .then(() => {
            dataAccess.del(`${cartDir}/${phone}`)
              .then(() => callback(200, { info: 'cart deleted' }))
              .catch(err => callback(400, { Error: err.code }));
          })
          .catch(err => callback(400, { Error: err.code }));
      })
      .catch(() => callback(400, { Error: 'no valid phone / token combination' }));
  } else {
    callback(400, { Error: 'no valid phone / password combination' });
  }
};

module.exports = (dataIn, callbackIn) => ((acceptableMethods.indexOf(dataIn.method) > -1)
  ? cart[dataIn.method](dataIn, callbackIn)
  : callbackIn(405));
