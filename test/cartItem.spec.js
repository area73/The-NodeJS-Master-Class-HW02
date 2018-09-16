const assert = require('assert');
const cartItemRoute = require('../routes/cartItem');
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


const cartItemRetrive = () => {
  console.log('It should give us a 200  trying to retrieve cart item with token [METHOD = GET]');
  const dataOkGet = Object.assign({},
    { method: 'get' },
    {
      queryStringObject: {
        phone: dataOk.payload.phone,
        id: '1',
      },
    },
    { headers: { token: 'G2iHTpt5miP7ACxRfYQq' } });
  cartItemRoute(dataOkGet, (codeNum, infoCode) => {
    assert.deepStrictEqual(200, codeNum);
  });
};

const cartItemAdd = () => {
  console.log('It should add a new item to cart and return a 200[METHOD = POST]');
  const dataOkGet = Object.assign({},
    { method: 'post' },
    {
      payload: {
        phone: '123456789',
        item: {
          price: '10', name: 'Pizza Mania', quantity: '2'
        },
      },
    },
    {
      queryStringObject: {
        phone: dataOk.payload.phone,
      },
    },
    { headers: { token: 'G2iHTpt5miP7ACxRfYQq' } });
  cartItemRoute(dataOkGet, (codeNum, infoCode) => {
    assert.deepStrictEqual(200, codeNum);
  });
};


const cartItemDelete = () => {
  console.log('It should delete cart');
  const dataOkDelete = Object.assign({},
    { payload: { phone: '123456789' } },
    { method: 'delete' },
    { headers: { token: 'G2iHTpt5miP7ACxRfYQq' } });
  cartItemRoute(dataOkDelete, (codeNum, infoCode) => {
    assert.deepStrictEqual(200, codeNum);
  });
};

const runTest = () => {
  cartItemRetrive();
  cartItemAdd();
  // cartItemDelete();
};

runTest();

/*
fileHandler.create('cart/123456789', { cart: '123456789' })
  .then(() => fileHandler.create('token/G2iHTpt5miP7ACxRfYQq', tokenObject))
  .catch(err => false)
  .finally(runTest);
*/
