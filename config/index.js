
const path = require('path')
module.exports = {
  dev: {
    publicPath: '/',
    devtool: 'cheep-module-eval-source-map',
    host: '0.0.0.0',
    port: 8080,
    proxyTable: {},
    autoOpenBrowser: true,
    cssSourceMap: true,
    assetsSubDirectory: 'static'
  },
  build: {
    publicPath: '/',
    devtool: false,
    host: '',
    proxyTable:{},
    autoOpenBrowser: false,
    cssSourceMap: false,
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    productionSourceMap: true
  }
}