const assert = require('assert');
const fileHandler = require('../lib/data');

// MOCK DATA
const relativeFilePath = 'test/sample.json';
const dataOk = { fileId: 143214, name: 'Rod' };
const dataUpdateOk = { name: 'Rodrigo', lastName: 'Erades' };


fileHandler.del(relativeFilePath)
  .finally(() => {
    console.log('It should create a new file');
    assert.doesNotReject(fileHandler.create(relativeFilePath, dataOk)
      .catch(err => console.log('ERROR => ', err)));

    console.log('It should read a file');
    assert.doesNotReject(fileHandler.read(relativeFilePath)
      .catch(err => console.log('ERROR [READ] = ', err)));

    console.log('It should update a file (adding more info)');
    assert.doesNotReject(fileHandler.update(relativeFilePath, dataUpdateOk)
      .catch(err => console.log('ERROR [UPDATE] = ', err)));

    console.log('It should delete a file');
    assert.doesNotReject(fileHandler.del(relativeFilePath)
      .catch(err => console.log('ERROR [DELETE] = ', err)));
  });

