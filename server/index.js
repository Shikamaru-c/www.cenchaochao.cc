const fs = require('fs')
const path = require('path')
const os = require('os')
const express = require('express')
const bodyParser = require('body-parser')
// const history = require('connect-history-api-fallback')
const scripts = require('./scripts.js')

const PORT = 5058

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../build/')))

app.post('/deploy', (req, res) => {
  const log = `${JSON.stringify(req.body)}${os.EOL}${os.EOL}------${os.EOL}${os.EOL}`
  fs.appendFileSync(path.join(__dirname, './webhook.log'), log)

  const commits = req.body.head_commit
  const paths = [...commits.added, ...commits.removed, ...commits.modified]
  const srcRegExp = /^src/
  const serverRegExp = /^server/
  const changes = paths.reduce((result, path) => {
     if (srcRegExp.test(path)) {
       result.src++
     } else if ('package.json' === path) {
       result.packageJson++
     } else if (serverRegExp.test(path)) {
       result.server++
     } else {
       result.other++
     }
     return result
  }, {
    src: 0,
    packageJson: 0,
    server: 0,
    other: 0
  })

  const tasks = [scripts.genGitPull()]
  if (changes.packageJson !== 0) {
    tasks.push(scripts.genNpmInstall())
  }
  if (changes.src !== 0) {
    tasks.push(scripts.genNpmRunGenerate())
    tasks.push(scripts.genNpmRunBuild())
  }
  if (changes.server !== 0) {
    tasks.push(scripts.genNpmRunReload())
  }
  tasks.push(() => {
    res.send('finished')
  })
  
  runTasks(tasks)()

  function runTasks (tasks) {
    return tasks.reduceRight((a, b) => {
      return () => b.call(null, a)
    })
  }
})

app.listen(PORT, () => {
  console.log(`the server is on port ${PORT}`)
})
