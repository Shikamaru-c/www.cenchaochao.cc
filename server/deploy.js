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

function genBuildScript () {
  let count = 0;

function runBuild () {
  count ++
  const build = spawn('npm', ['run', 'build])

  build.stdout.on('data', (data) => {
    // 记录日志
  })
  
  build.stderr.on('data', (data) => {
    // 记录日志
  })
  
  build.on('close', (code) => {
    if (code !== 0 && count < 3) {
      runBuild() 
    }
  })
}

}
  
