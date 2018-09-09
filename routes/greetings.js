// Sample handler

module.exports = function (data, callback) {
  switch (data.method) {
    case 'get':
      callback(200, { greetings: `greetings from server (${data.method})` });
      break;
    case 'post':
      callback(401, { greetings: `greetings from server (${data.method}): Method not allow` });
      break;
    default:
      callback(404, { greetings: `(${data.method}): Method not implemented` });
  }
};

