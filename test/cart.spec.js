const assert = require('assert');
const cartRoute = require('../routes/cart');
const fileHandler = require('../lib/data');
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

const tokenObject = {
  phone: '123456789',
  id: 'G2iHTpt5miP7ACxRfYQq',
  expires: 999991536694405122,
};


const cartRetrive = () => {
  console.log('It should give us a 400 error trying to retrieve cart because we don\'t have the token  [METHOD = GET]');
  const dataKoGet = Object.assign({},
    dataOk,
    { method: 'get' },
    { queryStringObject: { phone: dataOk.payload.phone } },
    { headers: {} });
  cartRoute(dataKoGet, (codeNum, infoCode) => {
    assert.deepStrictEqual(400, codeNum);
  });

  console.log('It should give us a 200  trying to retrieve cart with token [METHOD = GET]');
  const dataOkGet = Object.assign({},
    dataKoGet,
    { headers: { token: 'G2iHTpt5miP7ACxRfYQq' } });
  cartRoute(dataOkGet, (codeNum, infoCode) => {
    assert.deepStrictEqual(200, codeNum);
  });
};

const cartDelete = () => {
  console.log('It should delete cart');
  const dataOkDelete = Object.assign({},
    { payload: { phone: '123456789' } },
    { method: 'delete' },
    { headers: { token: 'G2iHTpt5miP7ACxRfYQq' } });
  cartRoute(dataOkDelete, (codeNum, infoCode) => {
    assert.deepStrictEqual(200, codeNum);
  });
};

const runTest = () => {
  cartRetrive();
  cartDelete();
};
fileHandler.create('cart/123456789', { cart: '123456789' })
  .then(() => fileHandler.create('token/G2iHTpt5miP7ACxRfYQq', tokenObject))
  .catch(err => false)
  .finally(runTest);
