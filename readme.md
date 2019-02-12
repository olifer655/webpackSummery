## webpack 总结

### 1、安装方式

	cnpm install -g webpack

安装成功后，在命令行输入 `webpack -h` 即可查看当前安装的版本信息

不过通常情况，建议在当前目录下，拷贝一份
	
	npm install webpack --save-dev

	# 简单的写法：-_-,缩写形式
	# npm i webpack -D
	# –save：模块名将被添加到dependencies，可以简化为参数-S。
	# –save-dev: 模块名将被添加到devDependencies，可以简化为参数-D。

注： 如果 `npm` 太慢，建议使用ied.安装步骤：

	npm i -g ied

### 2、webpack 的作用

 Webpack 是一个模块打包器。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。
 
 什么是模块？我们首先会想到 `JavaScript` 的 `ES2015` 模块、`AMD` 模块，又或 `CommonJS` 模块。

只不过在 webpack 下，所有资源文件（assets）都可以是模块，包括 `JavaScript`、 `CSS`、图片、`JSON` 等等。

我们当然清楚，在 JavaScript 里 import 图片会报错。但在 webpack 下，这没有问题。这要归功于加载器（loader）。通过加载器，webpack 将 JavaScript 的模块化普及至其它文件类型。

![webpack](https://pic4.zhimg.com/524ee3f84a1742cbc4de3e2ff95ce983_r.png)

  webpack是一个配置文件，主要分为三大块：

* entry 入口文件 让webpack用哪个文件作为项目的入口
* output 出口 让webpack把处理完成的文件放在哪里
* module 模块 要用什么不同的模块来处理各种类型的文件

### 3、创建新项目

#### 3.1 首先，新建一个package.json的文件在项目根目录下

	npm init
	// 如果懒得填一些信息 一直点回车

	npm install webpack --save-dev

之后，我们的项目下有两个内容：

1. package.json 文件
2. node_modules 文件夹

踩过的坑：

1.  一定要手动的建立一个 package.json 文件，如果没有不会执行。
2.  项目名称不能，包含大写字母，否则会报错： `Sorry, name can no longer contain capital letters`。


#### 3.2 接下来，创建一个两个js `index.js`和 ` main.js` 文件。

#### 3.3 配置Webpack

我们的目标是把这两个js文件合并成一个文件. 我们可以自己在build文件夹里面手动建一个index.html文件夹，然后再把合并以后的js引用在里面，但是这样有些麻烦，所以我们这里安装一个plugin，可以自动快速的帮我们生成HTML。

	npm install html-webpack-plugin --save-dev

有了这个插件,接下来开始写config文件

	var path = require('path');
	var HtmlwebpackPlugin = require('html-webpack-plugin');
	//定义了一些文件夹的路径
	var ROOT_PATH = path.resolve(__dirname);
	var APP_PATH = path.resolve(ROOT_PATH, 'app');
	var DIS_PATH = path.resolve(ROOT_PATH, 'dis');

	module.exports = {
		// 项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
		entry: APP_PATH,
		//输出的文件名 合并以后的js会命名为bundle.js
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
	};
ps: ` path ` 是 ` node.js ` 中的模块，一共分四个部分

 *  path.join()				// 方法用于连接路径
 *  path.resolve()			//用于将相对路径转为绝对路径。 __dirname始终指向当前js代码文件的目录。
 *  accessSync()			//用于同步读取一个路径
 *  path.relative()			//方法接受两个参数，这两个参数都应该是绝对路径。该方法返回第二个路径想对于地一个路径的系那个相对路径

在根目录运行

	webpack

然后，终端会出现下列内容，告诉你，安装成功了

	➜  webpack-summery git:(master) webpack
	Hash: 57dff4c8b51db2d90814
	Version: webpack 1.12.14
	Time: 539ms
     	Asset       Size  Chunks             Chunk Names
     bundle.js    1.39 kB       0  [emitted]  main
	index.html  163 bytes          [emitted]
		[0] ./app/index.js 0 bytes {0} [built]
	Child html-webpack-plugin for "index.html":
        	+ 3 hidden modules

这是，你会发现项目中多了一个 `dis` 文件，结构如下：

dis

-  bundle.js

- index.html

#### 3.4 配置webpack-dev-server

在 html 文件中引用 bundle.js 文件后，我们有几个问题需要解决。

1. main.js 或它所引用的模块的变化如何通知 webpack，重新生成 bundle.js？

	非常简单，在根目录下执行 webpack --watch 就可以监控目录下的文件变化并实时重新构建。

2. 上面只是实时构建，我们该如何把结果通知给浏览器页面，让 HTML 页面上的 bundle.js 内容保持最新？

	webpack 提供了 `webpack-dev-server` 解决实时刷新页面的问题，同时解决实时构建的问题

* 安装 `webpack-dev-server`

		npm install webpack-dev-server -g  //全局
		npm install webpack-dev-server --save-dev   //当前目录安装

* 配置 webpack.config.js

		module.exports = {
			....
			devServer: {
				historyApiFallback: true,
				hot: true,
				inline: true,
				progress: true,
			},
			...
		}

* 然后再package.json里面配置一下运行的命令,npm支持自定义一些命令

		...
		"scripts": {
			"start": "webpack-dev-server --hot --inline"
		},
		...
* 在根目录下输入 `npm start` 启动 `localhost:8080`

### 4、Css 样式
	npm install css-loader style-loader --save-dev

我们可以按传统方法使用 CSS，即在 HTML 文件中添加：

	<link rel="stylesheet" href="style/app.css">

但 webpack 里，CSS 同样可以模块化，使用 import 导入。因此我们不再使用 ` link ` 标签来引用 CSS，而是通过 webpack 的 style-loader 及 css-loader。前者将 css 文件以 <style></style> 标签插入 <head> 头部，后者会遍历css文件，找到所有的url(...)并解读、加载 CSS 文件。

配置loader后，在webpack.config.js中

	...

  	module: {
    	loaders: [
      		{
        		test: /\.css$/,
        		loaders: ['style', 'css'],
        		include: APP_PATH
      		}
    	]
  	},

	...

那现在想使用一些有爱的css预编译程序，来点sass吧。 你可能已经想到了，再来个loader就行啦，确实是这样简单。

	npm install sass-loader --save-dev

稍微修改一下config，删掉我们先前添加的css规则，加上下面的loade

	module: {
    	loaders: [
        	{ test: /\.css$/, loaders: ['style', 'css', 'sass'], include: SRC_PATH }
    	]
  	}


### 5、处理图片和其他静态文件

安装loader，处理文件。诸如图片，字体等等，不过有个神奇的地方它可以根据你的需求将一些图片自动转成base64编码的，为你减轻很多的网络请求。

	npm install url-loader --save-dev
	npm install file-loader --save-dev

配置config文件

    {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
    }

注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片。

### 6、添加ES6的支持

首先，安装我们的loader

	npm install babel-loader babel-preset-es2015 --save-dev

配置我们的config文件

	...
	{
		=-098761`
  	test: /\.jsx?$/,
  	loader: 'babel',
  	include: APP_PATH,
  	query: {
    		presets: ['es2015']
  	}
	},
	...

现在我们可以改掉CommonJS风格的文件了。

### 7、排错和定位



### * Build

	npm start

### *Git 配置

		co = checkout
		ci = commit
		br = branch
		st = status

本项目中已经添加了git命令常用的配置，不需要自己再添加了哦~

### makefill 相关内容见issues#2
https://github.com/olifer655/randomNotes/issues/8
