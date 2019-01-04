const path = require('path')
const express = require('express')
// const history = require('connect-history-api-fallback')

const PORT = 5058

const app = express()

app.use(express.static(path.join(__dirname, '../build/')))

app.get('/deploy', (req, res) => {
  console.log(req)
})

app.listen(PORT, () => {
  console.log(`the server is on port ${PORT}`)
})