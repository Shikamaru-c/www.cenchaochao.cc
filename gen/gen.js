const fs = require('fs')
const path = require('path')
const glob = require('glob')
const POSTS_PATH = path.resolve(__dirname, '../src/posts')

glob(`${POSTS_PATH}/*.md`, (err, files) => {
  const res = files.map(file => {
    const rawContent = fs.readFileSync(file, {encoding: 'utf-8'})
    const arrayContent = rawContent.split('---').filter(i => !!i)

    const header = arrayContent[0].split('\r\n').filter(i => !!i).reduce((object, item) => {
      const arrayItem = item.split(':')
      const key = arrayItem.shift().trim()
      const value = arrayItem.join(':').trim()
      object[key] = value
      return object
    }, {})

    return {
      header,
      content: arrayContent[1]
    }
  })
  
  fs.writeFileSync(`${POSTS_PATH}/posts.json`, JSON.stringify(res))
})