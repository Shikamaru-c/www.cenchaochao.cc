const { spawn } = require('child_process')

runGitPull(genBuildScript())

function runGitPull (callback) {
  const gitPull = spawn('git', ['pull']);

  gitPull.stdout.on('data', (data) => {
    // 记录日志
  })

  gitPull.stderr.on('data', (data) => {
    // 记录日志
  })

  gitPull.on('close', (code) => {
    code === 0 && callback()
  })
}

function genDeployScript () {
  let count = 0;

function runDeploy () {
  count ++
  const deploy = spawn('npm', ['run', 'deploy'])

  deploy.stdout.on('data', (data) => {
    // 记录日志
  })
  
  deploy.stderr.on('data', (data) => {
    // 记录日志
  })
  
  deploy.on('close', (code) => {
    if (code !== 0 && count < 3) {
      runDeploy() 
    }
  })
}

}
  
