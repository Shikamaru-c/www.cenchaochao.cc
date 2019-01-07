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

  const commits = req.body.commits
  const paths = [...commits.added, ...commits.removed, ...commits.modified]
  const srcRegExp = /^src/
  const postRegExp = /^src\/posts\/\w*\.md$/
  const changes = paths.reduce((result, path) => {
     if (postRegExp.test(path)) {
       result.post++
     } else if (srcRegExp.test(path)) {
       result.src++
     } else if ('package.json' === path) {
       result.packageJson++
     } else {
       result.other++
     }
  }, {
    src: 0,
    post: 0,
    packageJson: 0,
    other: 0
  })

  const tasks = [scripts.genGitPull()]
  if (changes.packageJson !== 0) {
    tasks.push(scripts.genNpmInstall())
  }
  if (changes.post !== 0) {
    tasks.push(scripts.genNpmRunGenerate(3))
  }
  if (changes.src !== 0) {
    tasks.push(scripts.genNpmRunBuild())
  }
  runTasks(tasks.push(() => {
    res.send('finished')
  }))

  function runTasks (tasks) {
    return tasks.reduceRight((a, b) => {
      return () => b.call(null, a)
    })
  }
})

app.listen(PORT, () => {
  console.log(`the server is on port ${PORT}`)
})
