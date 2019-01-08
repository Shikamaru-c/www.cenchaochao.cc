const { genScript } = require('./utils/index.js')

module.exports = [
    {
      name: 'default',
      scripts: [
        genScript({command: 'git pull'})
      ]
    },
    {
      name: 'modules',
      regExp: /^package\.json$/,
      scripts: [
        genScript({command: 'npm install'})
      ]
    },
    {
      name: 'src',
      regExp: /^src/,
      scripts: [
        genScript({command: 'npm run generate'}),
        genScript({command: 'npm run build', maxRetry: 3})
      ]
    },
    {
      name: 'server',
      regExp: /^server/,
      scripts: [
        genScript({command: 'npm run reload'})
      ]
    }
]