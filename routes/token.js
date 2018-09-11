const dataAccess = require('../lib/data');
const helpers = require('../lib/helpers');

const acceptableMethods = ['post', 'get', 'put', 'delete'];
const token = {};


token.post = (data, callback) => {
  // Check that all required fields are filled out
  const phone = helpers.minimumLength(helpers.isString(data.payload.phone).trim(), 8);
  const password = helpers.minimumLength(helpers.isString(data.payload.password).trim(), 0);
  if (phone && password) {
    dataAccess.read(`user/${phone}`)
      .then((data) => {
        if (helpers.parseJsonToObject(data).password === helpers.hash(password)) {
          const tokenId = helpers.createRandomString(20);
          const expires = Date.now() + 1000 * 60 * 60;
          const tokenObject = {
            phone,
            id: tokenId,
            expires,
          };
          // persist token
          dataAccess.create(`token/${tokenId}`, tokenObject)
            .then(() => callback(200, tokenObject))
            .catch(err => callback(500, { Error: err.code }));
        } else {
          callback(400, { Error: 'no valid phone / password combination' });
        }
      })
      .catch(err => callback(400, { Error: err.code }));
  } else {
    callback(400, { Error: 'Missing required fields' });
  }
};

token.get = (data, callback) => {
// Check that all required fields are filled out
  const id = helpers.minimumLength((data.queryStringObject.id).trim(), 19);
  if (id) {
    dataAccess.read(`token/${id}`)
      .then(data => callback(200, data))
      .catch(err => callback(400, { Error: err.code }));
  } else {
    callback(400, { Error: 'Missing required fields' });
  }
};

token.put = (data, callback) => {
  const id = helpers.minimumLength((data.payload.id).trim(), 19);
  const extend = helpers.isBoolean(data.payload.extend);
  if (id && extend) {
    dataAccess.read(`token/${id}`)
      .then(() => {
        dataAccess.update(`token/${id}`, { expires: Date.now() + 1000 * 60 * 60 })
          .then(() => callback(200, { info: 'token updated' }))
          .catch(err => callback(400, { Error: err.code }));
      })
      .catch(err => callback(400, { Error: err.code }));
  } else {
    callback(400, { Error: 'Missing required fields' });
  }
};


token.delete = (data, callback) => {
  const id = helpers.minimumLength(helpers.isString(data.payload.id).trim(), 19);
  if (id) {
    dataAccess.read(`token/${id}`)
      .then(() => callback(200, { info: 'token deleted' }))
      .catch(err => callback(400, { Error: err.code }));
  } else {
    callback(400, { Error: 'no valid id' });
  }
};

module.exports = (dataIn, callbackIn) => ((acceptableMethods.indexOf(dataIn.method) > -1)
  ? token[dataIn.method](dataIn, callbackIn)
  : callbackIn(405));
