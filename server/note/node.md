前面都是client编程。下面是服务器编程。

服务器生成web page和各种资源。客户端显示出来。

## 概念
浏览器 - 操作系统 - HTTP request - TCP - Socket - HTTP response

## 基础

CS110: Principles of Computer Systems
CS144: Introduction to Computer Networking (Prereq:
CS110)

## Node：Nodejs

基于JS的服务器程序

采用chrome的V8 JS理解器
共用parser，execution engine，garbage collector，js runtime（stack，memory）

不同的是：
1. Chrome是DOM API，比如console.log()
2. Node是NodeJS API，比如http.createServer()。没有document这种定义。但有console.log

# Node.js

Server-side scripting. Threaded vs event-based server models. Working with callbacks. The Express web framework.

## 安装运行
安装：http://www.nodejs.org/
运行：node
打开VScode，F5，开始debug
node hello.js

## 安装和导入模块

npm安装包：npm install package_name
也可以用package.json指定要安全的库

npm: node package manager
各种包：https://www.npmjs.com/
npm install package-name
npm uninstall package-name

会把源码下载，安装到node_modules目录下。

```JavaScript
var http = require("http");
```

## 创建HTTP server

req：请求对象 request，包括了客户的请求
res：响应对象 response，赋值，反馈给客户

```JavaScript
var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
```

## 最基本的node web server

on相当于addEventListener
1. request：收到请求。req是输入信息，res接受我们的返回。end送回response
2. listening：绑定（binding）端口，开始侦听，接受请求

```js
const http = require('http')
const port = 3000
const server = http.createServer()

server.on('request', function(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
})

server.on('listening', function() {
  console.log(`Server running at http://${hostname}:${port}/`)
})

server.listen(port);
```

也可以更简洁

```js
const http = require('http')
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
})

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
```

用浏览器访问 http://localhost:3000 就可以了。

## query方法

三种
1. 浏览器：Get
2. fetch：送各种请求，包括Get，Post
3. curl命令行工具：curl --request PUT http://localhost:3000/hello

然后就可以fetch了。

fetch('http://localhost:3000/hello')
  .then(onResponse)
  .then(onTextReady);

## Get query参数

参数存在：req.query里，比如
req.query.name里面就存着“yishuai”

http://localhost:3000/hello?name=yishuai

## fetch POST 加参数，

但一般不这么用，而是在request的body里送data

fetch('/hello?name=yishuai',{ method: 'POST'})
  .then(onResponse)
  .then(onTextReady);

# 练习

安装node.js：http://web.stanford.edu/class/cs193x/install-node/

# 开放其它电脑访问

用localtunnel：https://github.com/localtunnel/localtunnel

npm install -g localtunnel
	-g：全局安装，只用于命令行

lt --port 3000

后台各种服务器

前台路由请求

## 上传代码

别upload node_modules目标。用package.json说明就行。
用npm init生成package.json
回答问题，自动生成
包括：name，version，description，main，dependency，author，license
然后，安装包的时候，用
npm install --save express
它会往package.json里加dependency
npm install会根据这个文件，自动装这些package
scripts里包括命令：可以用npm运行，比如，npm start

## 异步事件处理

两类异步事件
1. click的回调函数
2. fetch：不等着。结果回来了，再接着处理

写出来的程序，不像普通的序列执行的代码，不好看。

用async，await，可以写得像序列执行似的。
await是等待一个promise

源代码：
function onJsonReady(json) {
 console.log(json);
}
function onResponse(response) {
	return response.json();
}
fetch('albums.json')
    .then(onResponse)
    .then(onJsonReady);

新代码：

async function loadJson() {
	const response = await fetch('albums.json');
	const json = await response.json();
	console.log(json);
}
loadJson();

构造器不能是async的。
async函数可以作为参数送给
1. addEventListener(Browser)
2. on(NodeJS)
3. get/put/delete/etc (ExpressJS)

node7.5以后才支持async

练习：
sheet：getRows，appendRow, deleteRow都返回Promise

## 模板literal

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

在字符串中加入表达式。更清晰。
’port ${port}", 而不是 “port ” + port

## 返回json

res.json()

练习：
lec21/dictionary

## post写本地文件

两个库：

npm install fs-extra

1. fs：NodeJS API库，使用回调

2. fs-extra 模块，操作文件系统，npm库，使用回调或者promise

fse.writeJson(fileName, object);

## 模块

定义自己的NodeJS模块
https://nodejs.org/api/modules.html#modules_the_module_object

一个模块，是一个JS文件

可以用 require('./mod1.js') 直接包进去。要加.，否则会去node_modules里面去找。
https://nodejs.org/api/modules.html#modules_all_together

模块是一个特别的对象。require函数会返回JS文件中用module.exports设置的值。其它都是private的。所以，如果JS里面有全局变量的话，它会保持这个状态。比如let i = 0，然后在外面加1三次，它就会变成3。这个要注意。

练习：
simple-modules
Try loading the other modules (e.g. function-module.js) by changing the require statement in scripts.js.

## 中间件：路由

把JSON API请求，独立出来，作为一个中间件（Middleware）

1. 定义Router对象

在api.js里定义，并导出router

const express = require('express');
const router = express.Router();

async function onLookupWord(req, res) {
router.get('/lookup/:word', onLookupWord);

module.exports = router;

在server.js里用app.use(router)用这个route。

2. 中间件里要访问MongoDB

定义Middleware函数，三个参数：req，res，next
如果res.send, res.json，就不必call next了。
可以给req加新属性，把collection给它，在后面的Middleware里就能访问collection了。

app.get
app.use

Express documentation:
- Router： https://expressjs.com/en/4x/api.html#router
- Writing / Using Middleware
	https://expressjs.com/en/guide/writing-middleware.html
	https://expressjs.com/en/guide/using-middleware.html
