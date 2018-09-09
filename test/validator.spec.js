const assert = require('assert');
const validator = require('../lib/validator');

// MOCK DATA
const mMailOk = ['rerades@siete3.com', 'a@b.c', 'test-new@other-test.es'];
const mMailKo = ['rerad_siet.com', '@.com', 'siete@tres,com', 'one@two@more.com', 'other@not_valid.com'];
const mNUmberOk = [123, '123', '12 33 44'];
const mNumberKo = ['12a', '12.2', '-32'];
const mPhoneOk = ['(123) 456 7899', '(123).456.7899', '(123)-456-7899', '123-456-7899', '123 456 7899', '1234567899'];
const mPhoneKo = ['+34 4343', '4433', '123 45 6a'];

console.log('Should validate email');
for (const param of mMailOk) {
  assert.ok(
    validator.email(param),
    `[${param}] Should response true if email is valid`,
  );
}
for (const param of mMailKo) {
  assert.strictEqual(
    validator.email(param),
    false,
    `Parameter [${param}] should not be valid`,
  );
}

console.log('Should validate number');
for (const param of mNUmberOk) {
  assert.ok(
    validator.number(param),
    `[${param}] Should be a valid number`,
  );
}
for (const param of mNumberKo) {
  assert.strictEqual(
    validator.number(param),
    false,
    `Parameter [${param}] should not be valid`,
  );
}

console.log('Should validate Phone number');
for (const param of mPhoneOk) {
  assert.ok(
    validator.phone(param),
    `[${param}] Should be a valid number`,
  );
}
for (const param of mPhoneKo) {
  assert.strictEqual(
    validator.phone(param),
    false,
    `Parameter [${param}] should not be valid`,
  );
}
