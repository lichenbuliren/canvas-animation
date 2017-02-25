var path = require('path');
var glob = require('glob');
var webpack = require('webpack');

// HTML 文件资源自动引入插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
// 使用 md5 算法计算 chunkhash 值
var WebpackMd5Hash = require('webpack-md5-hash');
// 抽取样式文件到独立文件中
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var entries = getEntry('./src/view/**/*.js', './src/view/');
var chunks = Object.keys(entries);
console.log(entries);

// // 配置 vendors
// entries.vendors = ['./src/util/index.js'];

module.exports = {
  entry: {
    main: './src/view/perspective/index.js',
    vendors: ['./src/util/index.js']
  },
  output: {
    filename: '[name].[chunkhash].js',
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
    new ExtractTextPlugin('styles.[chunkhash].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/view/perspective/index',
      chunks: ['vendors', 'manifest', 'main']
    }),
    new CommonsChunkPlugin({
      // 该插件可以将 webpack 运行产生的编译代码抽取到单独文件 manifest 中，这样子就不会影响最后编译出来的库文件内容的改变
      names: ['vendors', 'manifest'], //vendor libs + extracted manifes
      // chunks: ,
      // minChunks: chunks.length
    }),
    new UglifyJsPlugin({
      beautify: true,
      sourceMap: true,
      include: path.resolve(__dirname, 'src')
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

// var pages = Object.keys(getEntry('./src/view/**/*.html', './src/view/'));

// // 遍历 *.html 文件名
// pages.forEach(function (pathname) {
//   var pageConfig = {
//     filename: './view/' + pathname + '.html',
//     template: './src/view/' + pathname + '.html',
//     inject: false
//   }

//   console.log(pathname);

//   if (pathname in config.entry) {
//     pageConfig.chunks = ['vendors', 'manifest', pathname];
//   }

//   console.log(pageConfig);

//   config.plugins.push(new HtmlWebpackPlugin(pageConfig));
// });

// module.exports = config;

function getEntry(globPath, pathDir) {
  // 获得所有 JS 文件路径名称
  var files = glob.sync(globPath);
  var entries = {};
  var entry, dirname, basename, pathname, extname;
  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = dirname + '/' + basename;
    // 作为 entry 的 key 值，需要去掉路径前面的 './dirname' 也就是 './src' ;
    pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
    entries[pathname] = entry;
  }
  return entries;
}