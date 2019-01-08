const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

function runTasks (tasks, reqTime) {
  return tasks.reduceRight((a, b) => {
    return b.bind(null, a, reqTime)
  })
}

function genScript ({
  command,
  maxRetry
} = {
  maxRetry: 0
}) {
  let count = 0
  return function runScript (callback, reqTime) {
    count ++
    exec(command, (error, stdout, stderr) => {
      if (!error) {
        stdout && log({
          command,
          type: 'stdout',
          message: stdout,
          reqTime
        })
        stderr && log({
          command,
          type: 'stderr',
          message: stderr,
          reqTime
        })
        callback()
      } else if (count <= maxRetry) {
        runScript()
      } else {
        log({
          command,
          type: 'error',
          message: error,
          reqTime
        })
      }
    })
  }
}

  function log ({command, type, message, reqTime}) {
    const endTime = new Date()
    const log = `
    start: ${reqTime}
    end: ${endTime}
    elapsed time: ${(endTime - reqTime) / 1000}s
    script: ${command}
    type: ${type}
    message: ${message}
    `
    fs.appendFileSync(path.join(__dirname, '../log/script.log'), log)  
  }

module.exports = {
  runTasks,
  genScript
}