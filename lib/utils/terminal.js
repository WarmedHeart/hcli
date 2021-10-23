const { spawn, exec } = require('child_process');
const  process = require('process');

const spawnCommand = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('close', () => {
      resolve();
    })
  })
}

module.exports = {
  spawn: spawnCommand
}