const dataAccess = require('../lib/data');
const helpers = require('../lib/helpers');
const tokenUtil = require('../lib/tokenUtils');

/*
GET /cart-item: Get an item of the shopping cart.
POST /cart-item: Add an item to the shopping cart.
DELETE /cart-item: Remove an item with id 1 from the shopping cart.
PATCH /cart-item: Update the shopping cart item
*/


const acceptableMethods = ['get', 'post', 'delete', 'patch'];
const cartItem = {};
const cartDir = 'cart';


cartItem.get = (data, callback) => {
  const phone = helpers.minimumLength(helpers.isString(data.queryStringObject.phone).trim(), 8);
  const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
  const itemId = helpers.minimumLength(helpers.isString(data.queryStringObject.id).trim(), 0);
  if (phone && token) {
    // Verify that the given token is valid for the phone number
    tokenUtil.verify(token, phone)
      .then(() => {
        dataAccess.read(`${cartDir}/${phone}`)
          .then((userInfo) => {
            const selectedItem = helpers
              .parseJsonToObject(userInfo)
              .items
              .filter(item => item.id === itemId);
            return selectedItem
              ? callback(200, selectedItem)
              : callback(404, { info: 'item not found' });
          })
          .catch(err => callback(400, { Error: err.code }));
      })
      .catch(() => callback(400, { Error: 'no valid phone / token combination' }));
  } else {
    callback(400, { Error: 'required fields needed (phone , token)' });
  }
};
cartItem.post = (data, callback) => {
  const phone = helpers.minimumLength(helpers.isString(data.payload.phone).trim(), 8);
  const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
  if (phone && token) {
    tokenUtil.verify(token, phone)
      .then(() => {
        dataAccess.read(`${cartDir}/${phone}`)
          .then((cartInfo) => {
            const items = helpers.parseJsonToObject(cartInfo).items;
            const lastId = items.reduce(
              (prev, actual) => (prev.id > actual.id ? prev.id : actual.id), 0,
            );
            const newItem = { items: [...items, Object.assign(data.payload.item, { id: +lastId + 1 })] };
            dataAccess.update(`${cartDir}/${phone}`, newItem)
              .then(() => callback(200, newItem))
              .catch(() => callback(404, { info: 'item not found' }));
          })
          .catch(err => callback(400, { Error: err.code }));
      })
      .catch(e => callback(400, { Error: `${e}no valid phone / token combination` }));
  } else {
    callback(400, { Error: 'required fields needed (phone , token)' });
  }
};
cartItem.delete = (data, callback) => {

};
cartItem.patch = (data, callback) => {

};

module.exports = (dataIn, callbackIn) => ((acceptableMethods.indexOf(dataIn.method) > -1)
  ? cartItem[dataIn.method](dataIn, callbackIn)
  : callbackIn(405));
