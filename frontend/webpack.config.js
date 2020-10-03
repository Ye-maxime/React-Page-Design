/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/src/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'), // 会自动打包成一个bundle.js文件 并在index.html里面引用
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    // 打包html文件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
      // favicon: './public/favicon.ico',
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
      // chunksSortMode: 'dependency',
    }),
    new CleanWebpackPlugin(), // 每次打包前清空dist目录
    new MiniCssExtractPlugin(),
  ],
  devServer: { // 本地开发环境（webpack-dev-server）对应于frontend/package.json  start命令行
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
