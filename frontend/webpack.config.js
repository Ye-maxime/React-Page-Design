const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/src/index.tsx'),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, '/dist'), // 会自动打包成一个bundle.js文件 并在index.html里面引用
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
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
    ],
};