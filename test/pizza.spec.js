const assert = require('assert');
const pizzaRoute = require('../routes/pizza');
const fileHandler = require('../lib/data');
const helper = require('../lib/helpers');

const dataPayload = {
  method: 'get',
};


const firstPizza = [{
  name: 'Margarita',
  id: 1,
  price: { s: 6, m: 8, l: 12 },
  desc:
    'Plain old pizza, with a base of only tomato and mozzarella. Ready for you to add all the toppings that you like',
}];


const pizzaListRetrive = () => {
  console.log('It should retrive a list of pizzas  [METHOD = GET]');
  // TODO: we should mock pizza data, but only with plain node ?
  pizzaRoute(dataPayload, (codeNum, infoCode) => {
    assert.deepStrictEqual(200, codeNum);
    assert.deepStrictEqual(infoCode.filter(item => item.id === 1), firstPizza);
  });
};

const runTest = () => {
  pizzaListRetrive();
};

runTest();
