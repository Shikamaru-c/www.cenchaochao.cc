const fs = require('fs')
const path = require('path')
const os = require('os')
const express = require('express')
const bodyParser = require('body-parser')
// const history = require('connect-history-api-fallback')

const fileMatchers = require('./file-matchers.js')
const { runTasks } = require('./utils/index.js')

const PORT = 5058

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../build/')))

app.post('/deploy', (req, res) => {
  const log = `${JSON.stringify(req.body)}${os.EOL}${os.EOL}------${os.EOL}${os.EOL}`
  fs.appendFileSync(path.join(__dirname, './log/webhook.log'), log)

  const commits = req.body.head_commit
  const paths = [...commits.added, ...commits.removed, ...commits.modified]

  const matchers = fileMatchers.filter(matcher => {
    return matcher.name === 'default'
    || paths.some(path => matcher.regExp.test(path))
  })

  const tasks = matchers.reduce((tasks, matcher) => {
    tasks.push(...matcher.scripts)
    return tasks
  }, [])

  tasks.push(() => {
    res.send('finished')
  })
  
  runTasks(tasks)()
})

app.listen(PORT, () => {
  console.log(`the server is on port ${PORT}`)
})
