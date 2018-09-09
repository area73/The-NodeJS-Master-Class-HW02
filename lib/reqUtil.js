const url = require('url');
const { StringDecoder } = require('string_decoder');

const reqUtil = (req) => {
  let payload = '';
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const queryStringObject = parsedUrl.query;
  const decoder = new StringDecoder('utf-8');
  const addPayloadData = (data) => { payload += decoder.write(data); };
  const endPayloadData = () => { payload += decoder.end(); };
  const method = req.method.toString().toLowerCase();
  const { headers } = req;
  return {
    parsedUrl,
    path,
    trimmedPath,
    queryStringObject,
    headers,
    method,
    payload,
    addPayloadData,
    endPayloadData,
  };
};

module.exports = reqUtil;
