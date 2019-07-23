const path = require('path')
// webpack4.x.x 的css插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 公共的loader
const loader = [
  {
    // 打包的css loader
    loader: MiniCssExtractPlugin.loader
  },
  'css-loader',
  {
    // 这个如果不需要将px转为rem的就不需要
    loader: 'px2rem-loader',
    options: {
      // 计算的比例
      remUnit: 100,
      // 计算后的小数位数
      remPrecision: 8
    }
  },
  {
    loader: 'postcss-loader'
  }
]

module.exports = {
  entry: {
    // 配置入口文件
    main: path.resolve(__dirname, 'src/index.ts'),
    // 可以配置多个入口文件
    // page2: path.resolve(__dirname, 'src/page2.ts')
  },
  // 配置输出文件
  output: {
    filename: '[name].[chunkhash].js',//文件名 自动生成的chunkhash
    path: path.resolve(__dirname, 'dist'),// 输出文件的路径
    // 静态文件的引入的路径
    publicPath: '/'
  },
  resolve: {
    // 对扩展名的预判， 对数组中的扩展名的引入可以不用写扩展名
    extensions: ['.js', '.vue', '.tsx', '.ts', '.styl', '.stylus', '.json'],
    // 以下是对路径的别名缩写  在css中引入需要加入~
    alias: {
      // 主文件文件路径
      '@': path.resolve(__dirname, 'src'),
      '@views': path.resolve(__dirname, 'src/views'),
      // 静态文件路径
      'assets@': path.resolve(__dirname, 'src/assets')
    }
  },
  module: {
    // 这里是loader包的解析
    rules: [
      // js文件的解析
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // 必须包含解析的文件
        include: [
          path.resolve(__dirname, 'src')
        ],
        // 不包含的文件
        exclude: /node_modules/,
      },
      // ts文件的解析
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // 对于vue但文件中lang=ts的文件也使用这个loader解析
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      //vue单文件解析
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // 提取css文件
          extractCss: true
        }
      },
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
      },
      // 图片文件
      {
        test: /\.(png|jpe?g|svg|gif)(\?.*)?$/,
        // url-loader 这个loader的安装必须配合安装file-loader
        loader: 'url-loader',
        options: {
          // 对文件大小的限制在10000B以下的要打包为base64其它的输出为对应的文件
          limit: 10000,
          // 对文件打包的路径和文件名的配置  可以自行配置
          name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
        }
      },
      // 音频视频文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('staic', 'media/[name].[hash:7].[ext]')
        }
      },
      // 字体文件
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('staic', 'fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // 测试服务的配置
  devServer: {
    // 启动服务时打开浏览器
    open: true
  },
  plugins: [
    // html插件
    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve(__dirname, 'src/index.html')
    }),
    // vue的插件  这个插件在vue项目中必须安装
    new VueLoaderPlugin(),
    // css提取插件
    new MiniCssExtractPlugin({
      // css提取后输出文件
      filename: path.posix.join('static', 'css/[name]-[contenthash].css')
    })
  ]
}