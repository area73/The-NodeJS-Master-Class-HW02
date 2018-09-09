const config = require('../config/enviroments');

/**
 * @desc  Will retry connection to a new port if given port is already taken,
 *        until maxRetries or success
 * @param err {Error}
 * @param protocol {String} http or https
 * @param server {http.Server || https.Server}
 * @param maxRetries {Number} maximum number of retries
 */
const retry = (err, protocol, server, maxRetries = 3) => {
  this.attempts = typeof this.attempts !== 'undefined' ? this.attempts : maxRetries;
  switch (err.code) {
    case 'EADDRINUSE':
      if (this.attempts > 0) {
        this.attempts -= 1;
        console.log(`port ${err.port} already taken`);
        config[protocol] = err.port + 1;
        console.log(`...trying port ${config[protocol]}`);
        server.listen(config[protocol]);
      } else {
        console.log(`No free ports available  for ${protocol}!!`);
      }
      break;
    default:
      console.log(err);
  }
};

module.exports = { retry };
