'use strict'
const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.styleLoaders = (options) => {
  // 公共的loader
  const loader = [
    {
      // 打包的css loader
      loader: MiniCssExtractPlugin.loader
    },
    {
      loader:'css-loader',
      options: {
        sourceMap: options.sourceMap
      }
    },
    {
      // 这个如果不需要将px转为rem的就不需要
      loader: 'px2rem-loader',
      options: {
        // 计算的比例
        remUnit: 100,
        // 计算后的小数位数
        remPrecision: 5
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: options.sourceMap
      }
    }
  ]
  return [
    // css文件
    {
      test: /\.css$/,
      use: [
        ...loader
      ]
    },
    // css的处理文件的解析
    {
      test: /\.styl(us)?$/,
      use: [
        ...loader,
        'stylus-loader'
      ]
    },
    {
      test: /\.less$/,
      use: [
        ...loader,
        'less-loader'
      ]
    },
    {
      test: /\.(scss|sass)$/,
      use: [
        ...loader,
        'sass-loader'
      ]
    }
  ]
}

exports.assetsPath = (_path) => {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
      config.build.assetsSubDirectory : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}