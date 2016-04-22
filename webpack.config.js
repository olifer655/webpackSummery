var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

// 定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var DIS_PATH = path.resolve(ROOT_PATH, 'dis');

module.exports = {
  // 项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: SRC_PATH,
  // 输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: DIS_PATH,          // 输出文件夹的保存路径
    filename: 'bundle.js'    // 输入文件夹的名称
  },
  // 添加我们的插件 会自动生成一个html文件
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Hello World app'
    })
  ],
  // 配置文件自动刷新
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  module: {
    loaders: [
        {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass'],
          include: SRC_PATH
        },{
          test: /\.(png|jpg)$/,
          loader: 'url?limit=40000'
        },{
          test: /\.jsx?$/,
          loader: 'babel',
          include: SRC_PATH,
          query: {
            presets: ['es2015']
          }
        }
    ]
  }
};