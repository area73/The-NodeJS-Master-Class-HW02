/**
 *  Simple Node Server
 *  @author Rodrigo Erades <rerades@siete3.com>
 *  @desc A simple RESTful node server with 0 dependencies
 */

const http = require('http');
const https = require('https');
const config = require('./config/enviroments');
const router = require('./routes/router');
const reqUtil = require('./lib/reqUtil');
const { retry } = require('./lib/serverUtils');


const server = function (req, res) {
  const reqData = reqUtil(req);
  const chosenHandler = router[reqData.trimmedPath] || router.default;

  const executeResponse = () => {
    reqData.endPayloadData();
    chosenHandler(reqData, (statusCode, payload) => {
      const responseStatusCode = statusCode || 200;
      const responsePayload = payload || {};
      const payloadString = JSON.stringify(responsePayload);
      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(responseStatusCode);
      res.end(payloadString);
      console.log('Returning this response: ', responseStatusCode, payloadString);
    });
  };
  req.on('data', data => reqData.addPayloadData(data));
  req.on('end', executeResponse);
};



if (config.http) {
  const httpServer = http.createServer(server)
    .listen(config.http,
      () => console.log(`Server connected to port  ${config.http} (HTTP)`))
    .on('error', err => retry(err, 'http', httpServer, 4));
}

if (config.https) {
  const httpsServer = https.createServer(config.httpsOtions, server)
    .listen(config.https,
      () => console.log(`Server connected to port  ${config.https} (HTTPS)`))
    .on('error', err => retry(err, 'https', httpsServer, 6));
}
