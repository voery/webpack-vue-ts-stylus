const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// webpack4.x.x 的css插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const config = require('../config')
const utils = require('./utils')

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.build.cssSourceMap })
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  devtool: config.build.devtool,
  // 测试服务的配置
  devServer: {
    // 启动服务时打开浏览器
    open: config.build.autoOpenBrowser,
    host: config.build.host,
    hot: true,
    proxy: config.build.proxyTable,
    publicPath: config.build.publicPath
  },
  plugins: [
    // html插件
    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve(__dirname, '../src/index.html')
    }),
    // vue的插件  这个插件在vue项目中必须安装
    new VueLoaderPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_debugger: true,
          drop_console: true
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // css提取插件
    new MiniCssExtractPlugin({
      // css提取后输出文件
      filename: path.posix.join('static', 'css/[name]-[contenthash].css')
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: config.build.productionSourceMap ? { safe: true, map: {inline: false}} : { safe: true}
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test:/[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  }
})