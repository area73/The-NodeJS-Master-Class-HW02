/**
 * Configuration variables
 * */

const fs = require('fs');
const path = require('path');

const httpsServerOptions = {
  key: fs.readFileSync(path.join(__dirname, '../cert/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../cert/cert.pem')),
};

const environments = {
  dev: {
    name: 'development',
    http: 3000,
    // https: 3100,
    // httpsOtions: httpsServerOptions,
    hashingSecret: 'Pepinillos',
  },
  staging: {
    name: 'development',
    http: 5000,
    https: 5100,
    httpsOtions: httpsServerOptions,
    hashingSecret: 'Pepinillos',
  },
  prod: {
    name: 'production',
    // http: 4000,
    https: 4100,
    httpsOtions: httpsServerOptions,
    hashingSecret: 'Pepinillos',
  },
};

const defaultConfig = 'dev';
// Determine which environment was passed as a command-line argument
const currentEnv = () => {
  let newEnv = process.env.NODE_ENV || defaultConfig;
  if (!environments[newEnv]) {
    console.warn(`Can't find enviroment named [${newEnv}] switching to default [${defaultConfig}]`);
    newEnv = defaultConfig;
  }
  return newEnv;
};
const config = environments[currentEnv()];
module.exports = config;
