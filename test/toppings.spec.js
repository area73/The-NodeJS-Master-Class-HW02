const assert = require('assert');
const toppingsRoute = require('../routes/toppings');
const fileHandler = require('../lib/data');
const helper = require('../lib/helpers');

const dataPayload = {
  method: 'get',
};


const firstTopping = [{ id: 1, name: 'Pepperoni', price: 2 }];


const toppingsListRetrive = () => {
  console.log('It should retrive a list of toppings  [METHOD = GET]');
  // TODO: we should mock pizza data, but only with plain node ?
  toppingsRoute(dataPayload, (codeNum, infoCode) => {
    assert.deepStrictEqual(200, codeNum);
    assert.deepStrictEqual(infoCode.filter(item => item.id === 1), firstTopping);
  });
};

const runTest = () => {
  toppingsListRetrive();
};

runTest();
