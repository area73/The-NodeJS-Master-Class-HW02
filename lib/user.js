/**
 * User Object
 *
 * */


const create = (psw, email, params) => ({ action: 'success', msg: 'User saved on Data base' });


const user = {
  create,
};

module.exports = user;
