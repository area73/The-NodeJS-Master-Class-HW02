const dataAccess = require('./data');
const helper = require('./helpers');


const token = {};
token.verify = (id, phone) => new Promise((resolve, reject) => {
  dataAccess.read(`token/${id}`)
    .then((tokenData) => {
      const tokenObj = helper.parseJsonToObject(tokenData);
      return tokenObj.phone === phone && tokenObj.expires > Date.now()
        ? resolve(true)
        : reject(new Error('token not valid'));
    })
    .catch(() => reject(new Error('can\'t read file')));
});


module.exports = token;
