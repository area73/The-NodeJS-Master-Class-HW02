const assert = require('assert');
const userRoute = require('../routes/user');
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

const userCreate = () => {
  console.log('It should create a new user [METHOD = POST]');
  const dataOkPost = Object.assign({}, dataOk, { method: 'post' });
  userRoute(dataOkPost, (codeNum, infoCode) => {
    assert.deepStrictEqual(200, codeNum);
  });
};
const userRetrive = () => {
  console.log('It should give us a 400 error trying to retrieve user because we don\'t have the token  [METHOD = GET]');
  const dataKoGet = Object.assign({},
    dataOk,
    { method: 'get' },
    { queryStringObject: { phone: dataOk.payload.phone } },
    { headers: {} });
  userRoute(dataKoGet, (codeNum, infoCode) => {
    assert.deepStrictEqual(400, codeNum);
  });

  console.log('It should give us a 200  trying to retrieve user with token [METHOD = GET]');
  const dataOkGet = Object.assign({},
    dataKoGet,
    { headers: { token: '7GQd8mXFH1wRwAYZdQav' } });
  userRoute(dataOkGet, (codeNum, infoCode) => {
    assert.deepStrictEqual(200, codeNum);
  });
};
const userUpdate = () => {
  console.log('It should update user data');
  const dataOkPatch = Object.assign({},
    { payload: { note: 'New Fild added', phone: '123456789' } },
    { method: 'patch' },
    { headers: { token: '7GQd8mXFH1wRwAYZdQav' } });
  userRoute(dataOkPatch, (codeNum, infoCode) => {
    assert.deepStrictEqual(200, codeNum);
  });
};
const userDelete = () => {
  console.log('It should delete user');
  const dataOkDelete = Object.assign({},
    { payload: { phone: '123456789' } },
    { method: 'delete' },
    { headers: { token: '7GQd8mXFH1wRwAYZdQav' } });
  userRoute(dataOkDelete, (codeNum, infoCode) => {
    assert.deepStrictEqual(200, codeNum);
  });
};

const runTest = () => {
  userCreate();
  userRetrive();
  userUpdate();
  userDelete();
};

fileHandler.del('user/123456789')
  .finally(runTest);
