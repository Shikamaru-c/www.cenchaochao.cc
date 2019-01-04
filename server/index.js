const fs = require('fs')
const path = require('path')
const os = require('os')
const express = require('express')
const bodyParser = require('body-parser')
// const history = require('connect-history-api-fallback')

const PORT = 5058

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../build/')))

app.post('/deploy', (req, res) => {
  const log = `${JSON.stringify(req.body)}${os.EOL}${os.EOL}------${os.EOL}${os.EOL}`
  fs.appendFileSync(path.join(__dirname, './deploy.log'), log)
  res.end()
})

app.listen(PORT, () => {
  console.log(`the server is on port ${PORT}`)
})