const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// webpack4.x.x 的css插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('../config')
const utils = require('./utils')

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap})
  },
  devtool: config.dev.devtool,
  // 测试服务的配置
  devServer: {
    // 启动服务时打开浏览器
    open: config.dev.autoOpenBrowser,
    host: config.dev.host,
    port: (process.env.PORT && Number(process.env.PORT)) || config.dev.PORT,
    hot: true,
    proxy: config.dev.proxyTable,
    publicPath: config.dev.publicPath
  },
  plugins: [
    // html插件
    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve(__dirname, '../src/index.html')
    }),
    // vue的插件  这个插件在vue项目中必须安装
    new VueLoaderPlugin(),
    // css提取插件
    new MiniCssExtractPlugin({
      // css提取后输出文件
      filename: path.posix.join('static', 'css/[name]-[contenthash].css')
    })
  ]
})