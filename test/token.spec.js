const assert = require('assert');
const tokenRoute = require('../routes/token');
const fileHandler = require('../lib/data');

// MOCK DATA
const dataOk = {
  payload: {
    phone: '123456789',
    password: 'Abracadabra',
  },
};

const userObject = {
  firstName: 'Rodrigo',
  lastName: 'Erades',
  phone: '123456789',
  password: '075f1d191bd809b4e8a4fcc2f71671328ae8f45c879ec33a07b3e8ce7ddaf2c5',
  tosAgreement: true,
};

const tokenObject = {
  phone: '123456789',
  id: 'G2iHTpt5miP7ACxRfYQq',
  expires: 1536694405122,
};

const tokenCreate = () => {
  const dataOkPost = Object.assign({}, dataOk, { method: 'post' });
  console.log('It should create a valid token based on users phone & psw  [METHOD = POST]');
  tokenRoute(dataOkPost, (codeNum, infoCode) => {
    assert.deepStrictEqual(200, codeNum);
  });
};

const tokenRetrive = () => {
  console.log('It should give us a 200  trying to retrieve token [METHOD = GET]');
  const dataOkGet = {
    method: 'get',
    queryStringObject: { id: 'G2iHTpt5miP7ACxRfYQq' },
  };
  tokenRoute(dataOkGet, (codeNum, infoCode) => {
    assert.deepStrictEqual(200, codeNum);
  });
};
const tokenUpdate = () => {
  console.log('It should update token expiration time  [METHOD = PUT]');
  const dataOkPut = {
    method: 'put',
    payload: {
      id: 'G2iHTpt5miP7ACxRfYQq',
      extend: true,
    },
  };
  tokenRoute(dataOkPut, (codeNum, infoCode) => {
    assert.deepStrictEqual(200, codeNum);
  });
};
const tokenDelete = () => {
  console.log('It should delete token  [METHOD = DELETE]');
  const dataOkDelete = {
    method: 'delete',
    payload: {
      id: 'G2iHTpt5miP7ACxRfYQq',
    },
  };
  tokenRoute(dataOkDelete, (codeNum, infoCode) => {
    assert.deepStrictEqual(200, codeNum);
  });
};

const runTest = () => {
  tokenCreate();
  tokenRetrive();
  tokenUpdate();
  tokenDelete();
};

fileHandler.create('user/123456789', userObject)
  .then(() => {
    fileHandler.create('token/G2iHTpt5miP7ACxRfYQq', tokenObject);
  })
  .catch(err => false)
  .finally(runTest);
