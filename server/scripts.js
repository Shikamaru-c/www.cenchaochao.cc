const { exec } = require('child_process')

function genGitPull () {
  return function gitPull (callback) {
    exec('git pull', (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        return
      }
      console.log(stdout)
      console.log(stderr)
      callback()
    })
  }
}

function genNpmRunGenerate (MAX_COUNT) {
  let count = 0;
  return function npmRunGenerate (callback) {
    count++
    exec('npm run deploy', (error, stdout, stderr) => {
      if (!error) {
        console.log(stdout)
        console.log(stderr)
        callback()
      } else if (count <= MAX_COUNT) {
        npmRunGenerate() 
      } else if (count > MAX_COUNT) {
        // 记录发布失败
        return
      }
    })
  }
}

function genNpmInstall () {
  return function npmInstall (callback) {
    exec('npm install', (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        return
      }
      console.log(stdout)
      console.log(stderr)
      callback()
    })
  }
}

function genNpmRunBuild () {
  return function npmRunBuild (callback) {
    exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        return
      }
      console.log(stdout)
      console.log(stderr)
      callback()
    })
  }
}



module.exports = {
  genGitPull,
  genNpmRunGenerate,
  genNpmInstall,
  genNpmRunBuild
}