const scripts = require('./scripts.js')

module.exports = [
    {
      name: 'default',
      scripts: [
        scripts.genGitPull
      ]
    },
    {
      name: 'modules',
      regExp: /^package\.json$/,
      scripts: [
        scripts.genNpmInstall
      ]
    },
    {
      name: 'src',
      regExp: /^src/,
      scripts: [
        scripts.genNpmRunGenerate,
        scripts.genNpmRunBuild
      ]
    },
    {
      name: 'server',
      regExp: /^server/,
      scripts: [
        scripts.genNpmRunReload
      ]
    }
]