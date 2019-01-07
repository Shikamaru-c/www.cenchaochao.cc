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

function genNpmRunBuild (MAX_COUNT=7) {
  let count = 0;
  return function npmRunBuild (callback) {
    count++
    exec('npm run build', (error, stdout, stderr) => {
      if (!error) {
        console.log(stdout)
        console.log(stderr)
        callback()
      } else if (count <= MAX_COUNT) {
        npmRunBuild()
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

function genNpmRunGenerate () {
  return function npmRunGenerate (callback) {
    exec('npm run generate', (error, stdout, stderr) => {
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
  genNpmInstall,
  genNpmRunGenerate,
  genNpmRunBuild
}