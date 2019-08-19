const path = require('path')
const config = require('../config')


module.exports = {
  entry: {
    // 配置入口文件
    main: path.resolve(__dirname, '../src/index.ts'),
    // 可以配置多个入口文件
    // page2: path.resolve(__dirname, 'src/page2.ts')
  },
  // 配置输出文件
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:8].js',//文件名 自动生成的chunkhash
    path: path.resolve(__dirname, '../dist'),// 输出文件的路径
    // 静态文件的引入的路径
    publicPath: process.env.NODE_ENV === 'production' ? config.dev.publicPath : config.build.publicPath
  },
  resolve: {
    // 对扩展名的预判， 对数组中的扩展名的引入可以不用写扩展名
    extensions: ['.js', '.vue', '.tsx', '.ts', '.styl', '.stylus', '.json','.md'],
    // 以下是对路径的别名缩写  在css中引入需要加入~
    alias: {
      // 主文件文件路径
      '@': path.resolve(__dirname, '../src'),
      'cnpm': path.resolve(__dirname, '../src/components'),
      // 路由这页面
      '@views': path.resolve(__dirname, '../src/views'),
      // 静态文件路径
      '@assets': path.resolve(__dirname, '../src/assets'),
      'assetsjs': path.resolve(__dirname, '../src/assets/js')
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
          path.resolve(__dirname, '../src')
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
      },
      {
        test: /\.md$/,
        loader: 'text-loader'
      }
    ]
  }
}