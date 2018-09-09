const assert = require('assert');
const user = require('../lib/user');

// MOCK DATA
const mEmailOk = 'rerades@siete3.com';
const mPassOk = 'pepinillos33';
const mParamsOk = {
  tel: '912341234',
  address: 'C/ Casimiro , 9ºB',
  name: 'Rodrigo',
  lastName: 'Erades',
};
const createOkRes = { action: 'success', msg: 'User saved on Data base' };
/*
console.log("We should store their name, email address, and street address. PASSWORD, Phone")

"User's info can be edited"
"Users can be deleted"
*/
console.log('New users can be created');
assert.deepStrictEqual(user.create(mPassOk, mEmailOk, mParamsOk), createOkRes);
