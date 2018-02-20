// Override build -> build_webpack

process.env.NODE_ENV = 'production'
const reactScriptsConfig =
  require('./config-overrides.js')(require('react-scripts/config/webpack.config.prod'), process.env)

module.exports = Object.assign({}, reactScriptsConfig, {
  output: Object.assign({}, reactScriptsConfig.output, {
     path: __dirname + '/build_webpack'
  })
})