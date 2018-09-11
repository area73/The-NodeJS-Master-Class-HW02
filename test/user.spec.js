const assert = require('assert');
const user = require('../dao/user');

// MOCK DATA
const mEmailOk = 'rerades@siete3.com';
const mPassOk = 'pepinillos33';
const mParamsOk = {
  tel: '987654321',
  address: 'C/ Casimiro , 9ºB',
  name: 'Rodrigo',
  lastName: 'Erades',
};
const mParamsUpdate = {
  tel: '123456789',
  preference: ['peperoni', 'extra cheese', 'anchovies'],
}

const createOkRes = { action: 'success', msg: 'User saved on Data base' };
/*


"User's info can be edited"
"Users can be deleted"
*/
console.log('New users can be created');
console.log('We should store their name, email address, and street address. PASSWORD, Phone');
assert.deepStrictEqual(user.create(mPassOk, mEmailOk, mParamsOk), createOkRes);
console.log('User\'s info can be edited');
assert.deepStrictEqual(user.update(mParamsOk))
