const fs = require('fs')
const path = require('path')
const glob = require('glob')
const os = require('os')

const markdown = require('markdown').markdown
const readingTime = require('reading-time')

const POSTS_PATH = path.join(__dirname, '../src/posts')

glob(`${POSTS_PATH}/*.md`, (err, files) => {
  const split = '---'
  const res = files.map(file => {
    const rawContent = fs.readFileSync(file, {encoding: 'utf-8'})
    const arrayContent = rawContent.split(split).filter(i => !!i)

    // header
    const header = arrayContent.shift().split(os.EOL).filter(i => !!i).reduce((object, item) => {
      const arrayItem = item.split(':')
      const key = arrayItem.shift().trim()
      const value = arrayItem.join(':').trim()
      object[key] = value
      return object
    }, {})

    // content
    let content = arrayContent.join(split)
    content = content.startsWith(os.EOL) ? content.replace(os.EOL, '') : content

    // compute markdown reading time
    header.readingTime = readingTime(content)
    // beautify url
    header.url = path.basename(file, '.md')

    return {
      header,
      content: markdown.toHTML(content)
    }
  })
  
  fs.writeFileSync(`${POSTS_PATH}/posts.json`, JSON.stringify(res))
})