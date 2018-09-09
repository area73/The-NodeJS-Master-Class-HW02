/*
 * Library for storing and editing data
 *
 */
// Dependencies
const fsp = require('fs').promises;
const path = require('path');


const baseDir = path.join(__dirname, '/../.data/');
const rootFilePath = relativeFilePath => `${baseDir}/${relativeFilePath}`;
const toJSON = response => JSON.parse(response);
const updateObject = data => fileContentJSON => Object.assign({}, fileContentJSON, data);
const JSONToString = jsonObj => JSON.stringify(jsonObj);
const updateContent = relativeFilePath => updatedContent => fsp.writeFile(rootFilePath(relativeFilePath), updatedContent);
const openOptions = { flag: 'wx' };

const read = relativeFilePath => fsp.readFile(rootFilePath(relativeFilePath), 'utf8');
const del = relativeFilePath => fsp.unlink(rootFilePath(relativeFilePath));
const create = relativeFilePath => data => fsp.writeFile(
  rootFilePath(relativeFilePath),
  JSONToString(data),
  openOptions,
);
const update = (relativeFilePath, data) => read(relativeFilePath)
  .then(toJSON)
  .then(updateObject(data))
  .then(JSONToString)
  .then(updateContent(relativeFilePath))
  .catch(err => err);

// Container for module (to be exported)
const lib = {
  create, read, del, update,
};
// Export the module
module.exports = lib;
