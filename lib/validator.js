const email = emailString => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailString);
const number = num => /^[0-9\s]*$/.test(num);
const phone = tel => /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(tel);

const validator = {
  email,
  number,
  phone,
};
module.exports = validator;
