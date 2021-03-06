/**
 * A file watcher that will re-run a script when specified files change.
 *
 * Usage:
 *   watcher <file_to_run> [<watch_file_or_dir>, [<watch_file_or_dir>, ...]]
 *
 * Example:
 *   # Start index.js, and watch index.js, server.js, and the lib folder for changes.
 *   #
 *   $ node watcher index.js server.js lib
 *
 * Author: James Abney
 * Date: 2018-Sep-03
 */
const cp = require('child_process');
const fs = require('fs');

const RESTART_DELAY_MS = 2000;

// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const seq = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

/**
 * Log a message to the console in an app-specific way.
 *
 * @param {string} message
 * @param {'app'|'output'|'error'} type
 */
function conlog(message, type) {
  if (!useColors) {
    return console.log(message);
  }

  switch (type) {
    case 'app':
      return console.log(seq.yellow, message, seq.reset, '\n');
    case 'output':
      return console.log(seq.green, seq.bright, message, seq.reset);
    case 'error':
      return console.error(seq.red, seq.bright, message, seq.reset);
  }
}

/**
 * Spawn and return the process.
 *
 * @param {string} startFile
 */
function spawn(startFile) {
  const process = cp.spawn('node', [startFile]);

  // Bind to output streams and color the console messages.
  process.stdout.on('data', (b) => {
    conlog(b.toString(), 'output');
  });
  process.stderr.on('data', (b) => {
    conlog(b.toString, 'error');
  });

  return process;
}

/**
 * Kill and restart the process.
 *
 * @param {string} startFile
 * @param {cp.ChildProcess} process
 */
function restart(startFile, process) {
  return new Promise((resolve, reject) => {
    conlog('Restarting...', 'app');
    process.kill();
    setTimeout(async () => {
      resolve(spawn(startFile));
    }, RESTART_DELAY_MS);
  });
}

/**
 * Start the process and watch files.
 *
 * @param {string[]} paths
 */
function start(startFile, paths) {
  // Remove leading './' if any.
  const reFilename = /^(?:\.\/)?(.+?)$/;
  const file = startFile.replace(reFilename, '$1');
  conlog(`Starting ${file}, watching ${paths.join(', ')} ...`, 'app');
  // Start the process.
  let process = spawn(startFile);
  // File watch options.
  const options = { recursive: true};
  // Track when we're actively restarting.
  let restarting = false;
  // Watch each path.
  paths.forEach((path) => {
    fs.watch(path, options, async (event, filename) => {
      // Block repeat watch events that happen in quick succession.
      if (!restarting) {
        // Lock
        restarting = true;
        // Restart the process.
        process = await restart(startFile, process);
        // Unlock
        restarting = false;
      }
    });
  });
}

// Get command line arguments.
const args = process.argv.slice(2);

// Supported command line switches.
const switches = ['-n', '--no-colors'];

// Set use colors flag.
const useColors = args.filter(x => switches.includes(x)).length === 0;

// Get args that aren't switches.
const fileArgs = args.filter(x => !x.startsWith('-'));

// Get the js file to run.
const file = fileArgs[0];

// Start and watch.
start(file, fileArgs);
