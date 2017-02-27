var path = require('path');
var webpack = require('webpack');

// HTML 文件资源自动引入插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
// 使用 md5 算法计算 chunkhash 值
var WebpackMd5Hash = require('webpack-md5-hash');
// 抽取样式文件到独立文件中
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function (env) {
  return {
    entry: {
      'view/perspective': './src/view/perspective/index.js',
      'view/particle': './src/view/particle/index.js',
      'view/rotate': './src/view/rotate/index.js',
      vendors: './src/util/index'
    },
    output: {
      filename: '[name]/index.[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }, {
        test: /\.scss/,
        include: [path.resolve(__dirname, 'src')],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }, {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        options: {
          presets: [['es2015', { modules: false }]]
        }
      }]
    },
    plugins: [
      new UglifyJSPlugin({
        beautify: true,
        sourceMap: true,
        include: path.resolve(__dirname, 'src')
      }),
      new HtmlWebpackPlugin({
        filename: './view/perspective/index.html',
        template: './src/view/perspective/index.html',
        chunks: ['vendors', 'manifest', 'view/perspective']
      }),
      new HtmlWebpackPlugin({
        filename: './view/particle/index.html',
        template: './src/view/particle/index.html',
        chunks: ['vendors', 'manifest', 'view/particle']
      }),
      new HtmlWebpackPlugin({
        filename: './view/rotate/index.html',
        template: './src/view/rotate/index.html',
        chunks: ['vendors', 'manifest', 'view/rotate']
      }),
      new ExtractTextPlugin('styles.[chunkhash].css'),
      // 抽取公共文件
      new webpack.optimize.CommonsChunkPlugin({
        // 该插件可以将 webpack 运行产生的编译代码抽取到单独文件 manifest 中，这样子就不会影响最后编译出来的库文件内容的改变
        names: ['vendors', 'manifest'] //vendor libs + extracted manifest
      }),
      new WebpackMd5Hash(),
      new ChunkManifestPlugin({
        filename: 'chunk-manifest.json',
        manifestVariable: 'webpackManifest'
      })
    ],
    devtool: "source-map",
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      // match the output path
      publicPath: '/'
      // match the output `publicPath`
    },
  }
}