const dataAccess = require('../lib/data');
const helpers = require('../lib/helpers');
const tokenUtil = require('../lib/tokenUtils');

const acceptableMethods = ['post', 'get', 'put', 'patch', 'delete'];
const user = {};


user.post = (data, callback) => {
  // Check that all required fields are filled out

  const firstName = helpers.minimumLength(helpers.isString(data.payload.firstName).trim(), 0);
  const lastName = helpers.minimumLength(helpers.isString(data.payload.lastName).trim(), 0);
  const phone = helpers.minimumLength(helpers.isString(data.payload.phone).trim(), 8);
  const password = helpers.minimumLength(helpers.isString(data.payload.password).trim(), 0);
  const tosAgreement = helpers.isBoolean(data.payload.tosAgreement)
    ? data.payload.tosAgreement
    : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    const hashedPassword = helpers.hash(password);
    const userObject = {
      firstName,
      lastName,
      phone,
      password: hashedPassword,
      tosAgreement: true,
    };
    dataAccess.create(`user/${phone}`, userObject)
      .then(() => callback(200, { info: 'User created' }))
      .catch((err) => {
        console.log(err);
        callback(400, { Error: err.code });
      });
  } else {
    callback(400, { Error: 'Missing required fields' });
  }
};

user.get = (data, callback) => {
  const phone = helpers.minimumLength(helpers.isString(data.queryStringObject.phone).trim(), 8);
  const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
  if (phone && token) {
    // Verify that the given token is valid for the phone number
    tokenUtil.verify(token, phone)
      .then(() => {
        dataAccess.read(`user/${phone}`)
          .then(userInfo => callback(200, helpers.parseJsonToObject(userInfo)))
          .catch(err => callback(400, { Error: err.code }));
      })
      .catch(() => callback(400, { Error: 'no valid phone / token combination' }));
  } else {
    callback(400, { Error: 'required fields needed (phone , token)' });
  }
};

user.put = (data, callback) => {
  user.patch(data, callback);
};

user.patch = (data, callback) => {
  const password = helpers.minimumLength(helpers.isString(data.payload.password).trim(), 0);
  const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
  const userObject = password
    ? Object.assign({}, data.payload, { password: helpers.hash(password) })
    : data.payload;
  const phone = helpers.minimumLength(helpers.isString(userObject.phone).trim(), 8);
  if (phone && token) {
    tokenUtil.verify(token, phone)
      .then(() => {
        dataAccess.update(`user/${phone}`, userObject)
          .then(() => callback(200, { info: 'user updated' }))
          .catch(err => callback(400, { Error: err.code }));
      })
      .catch(() => callback(400, { Error: 'no valid phone / token combination' }));
  } else {
    callback(400, { Error: 'required fields needed (phone , token)' });
  }
};

user.delete = (data, callback) => {
  const phone = helpers.minimumLength(helpers.isString(data.payload.phone).trim(), 8);
  const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
  if (phone && token) {
    tokenUtil.verify(token, phone)
      .then(() => {
        dataAccess.read(`user/${phone}`)
          .then(() => {
            dataAccess.del(`user/${phone}`)
              .then(() => callback(200, { info: 'user deleted' }))
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
  ? user[dataIn.method](dataIn, callbackIn)
  : callbackIn(405));
