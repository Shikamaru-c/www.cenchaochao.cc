const path = require('path')
const express = require('express')
// const history = require('connect-history-api-fallback')

const app = express()

app.use(express.static(path.join(__dirname, '../build/')))

app.get('/deploy', (req, res) => {
  console.log('/deploy')
})

app.listen(5058, () => {
  console.log(`the server is on port 3000`)
})