const { exec } = require('child_process')

function genScript ({
  command,
  errorCallback,
  stderrCallback,
  stdoutCallback,
  maxRetry
} = {
  errorCallback: () => {},
  stderrCallback: () => {},
  stdoutCallback: () => {},
  maxRetry: 0
}) {
  let count = 0
  return function runScript (callback) {
    count ++
    exec(command, (error, stdout, stderr) => {
      if (!error) {
        stdout && stdoutCallback()
        stderr && stderrCallback()
        callback()
      } else if (count <= maxRetry) {
        runScript()
      } else {
        errorCallback()
      }
    })
  }
}

module.exports = {
  genScript
}