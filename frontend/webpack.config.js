/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/src/index.tsx'),
  output: {
    filename: 'js/[name].[hash].js', // 对应在webpack-analyzer main.hash.js chunk部分 旗下的src部分为自己项目独有的代码
    path: path.join(__dirname, '/dist'), // 会自动打包成一个main.js文件 并在index.html里面引用
    publicPath: '/', // 项目中引用css，js，img等资源时候的一个基础路径
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'cheap-module-eval-souce-map', // 开发模式用
  //   devtool: 'cheap-module-souce-map', // 生产模式用 使得打包后的dist文件夹下不生成js文件的map

  resolve: {
    // 可以在 import 文件时，不用写上后缀
    extensions: ['.ts', '.tsx', '.js', '.json'],
    // 文件路径别名, 这里设置好后 还得在tsconfig.json里面设置 https://juejin.im/post/6868472838613893127
    alias: {
      '@': path.resolve('./src'),
      '@store': path.resolve(__dirname, './src/store'),
      '@selectors': path.resolve(__dirname, './src/selectors'),
      '@config': path.resolve(__dirname, './src/config'),
      '@dataModels': path.resolve(__dirname, './src/dataModels'),
      '@plugins': path.resolve(__dirname, './src/plugins'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader?cacheDirectory=true',
          { loader: 'ts-loader', options: { transpileOnly: true } }, // 关闭类型检查，即只进行转译, 类型检查交给 fork-ts-checker-webpack-plugin 在别的的线程中做
        ],
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 有了它，就不需要style-loader了
          {
            loader: 'css-loader',
            options: {
              sourceMap: false, // 使得打包后的dist文件夹下不生成css文件的map
            },
          },
          'sass-loader',
        ],
      },

      // images
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
              publicPath: 'images',
            },
          },
          {
            // 压缩图片
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // 打包html文件，可以把编译好的js, css资源自动插入到 index.html 中
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
      // favicon: './public/favicon.ico',
      chunks: ['main', 'vendors'], // 可以设置chunks按需引入JS文件，不设置就会引入所有产出的js
      chunksSortMode: 'manual', // 按上面chunks的顺序在index.html中引入,不用这个的话,引入到html的JS可能是错乱排序的, 然而没用!!!
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true, // 压缩文内js
        minifyCSS: true, // 压缩文内css
        minifyURLs: true,
      },
    }),
    new CleanWebpackPlugin(), // 每次打包前清空dist目录
    // 打包导出 CSS 到独立文件 css/main.css 和 css/vendors.css
    new MiniCssExtractPlugin({ filename: 'css/[name].[hash].css' }),
    // fork 一个进程进行检查
    new ForkTsCheckerWebpackPlugin({ async: false }),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        // 压缩js
        cache: true,
        parallel: true,
        sourceMap: false, // 开发环境为true  生产环境为false
        uglifyOptions: {
          warnings: false, //当删除没有用处的代码时，显示警告
          compress: {
            //压缩代码
            dead_code: true, //移除没被引用的代码
            loops: true, //当do、while 、 for循环的判断条件可以确定是，对其进行优化
          },
        },
      }),
      // 压缩 CSS
      new OptimizeCssAssetsPlugin(),
    ],
    // 提取公共资源
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 抽离第三方插件
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 在进项分割时，一个模块可能同时属于不同的cache group，优化器将会选择那个拥有更高priority的分组
          name: 'vendors', // 会生成vendors.hash.js(第三方js文件) 和 vendors.hash.css(第三方css文件)
        },
      },
    },
  },
  devServer: {
    // 本地开发环境（webpack-dev-server）对应于frontend/package.json  start命令行
    // contentBase: path.join(__dirname, '/dist'),
    historyApiFallback: true,
    compress: true,
    port: 8081, // Project is running at http://localhost:8080/   控制浏览器url的端口
    proxy: {
      '/api/**': {
        target: 'http://localhost:4000/', // http://localhost:8080/api/...会被代理到请求 http://localhost:4000/api/...  不行改成google.com试下
      },
    },
  },
};
