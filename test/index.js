const fs = require('fs');
const childProcess = require('child_process');

const runScript = (scriptPath, callback) => {
  // keep track of whether callback has been invoked to prevent multiple invocations
  let invoked = false;
  const process = childProcess.fork(scriptPath);

  // listen for errors as they may prevent the exit event from firing
  process.on('error', (err) => {
    process.exit(0);
    if (invoked) return;
    invoked = true;
    callback(err);
  });
  // execute the callback once the process has finished running
  process.on('exit', (code) => {
    if (invoked) return;
    invoked = true;
    const err = code === 0 ? null : new Error(`exit code ${code}`);
    callback(err);
  });
};

const exitPorccess = (err) => {
  if (err) throw err;
  console.log('finished running scripts');
};

const execFiles = (err, items) => {
  if (err) throw new Error();
  items.filter(testFile => testFile !== 'index.js').map(file => runScript(file, exitPorccess));
};

fs.readdir('./', execFiles);
