const assert = require('assert');
const tokenRoute = require('../routes/token');

// MOCK DATA
const dataOk = {
  payload: {
    firstName: 'Rodrigo',
    lastName: 'Erades',
    phone: '123456789',
    password: 'Abracadabra',
    tosAgreement: true,
  },
};


const dataOkPost = Object.assign({}, dataOk, { method: 'post' });
console.log('It should get a valid token based on users phone & psw');
tokenRoute(dataOkPost, (codeNum, infoCode) => {
  assert.deepStrictEqual(200, codeNum);
})
