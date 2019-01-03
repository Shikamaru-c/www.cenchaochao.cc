const fs = require('fs')
const path = require('path')
const glob = require('glob')
const markdown = require('markdown').markdown
const POSTS_PATH = path.resolve(__dirname, '../src/posts')

glob(`${POSTS_PATH}/*.md`, (err, files) => {
  const split = '---'
  const res = files.map(file => {
    const rawContent = fs.readFileSync(file, {encoding: 'utf-8'})
    const arrayContent = rawContent.split(split).filter(i => !!i)

    const header = arrayContent.shift().split('\r\n').filter(i => !!i).reduce((object, item) => {
      const arrayItem = item.split(':')
      const key = arrayItem.shift().trim()
      const value = arrayItem.join(':').trim()
      object[key] = value
      return object
    }, {})

    let content = arrayContent.join(split)
    content = content.startsWith('\r\n\r\n') ? content.replace('\r\n\r\n', '') : content

    return {
      header,
      content: markdown.toHTML(content)
    }
  })
  
  fs.writeFileSync(`${POSTS_PATH}/posts.json`, JSON.stringify(res))
})