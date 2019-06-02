# NodeJS

Server-side scripting. Threaded vs event-based server models. Working with callbacks. The Express web framework.

前面都是client编程。下面是服务器编程。

服务器生成web page和各种资源， 提供给客户端。客户端负责显示出来。

## 概念

浏览器 - 操作系统 - HTTP request - TCP - Socket - HTTP response

## 相关知识

服务器涉及到计算机系统、网络的相关知识。因此，相关课程包括
1. CS110: Principles of Computer Systems
2. CS144: Introduction to Computer Networking

## Node、Nodejs

基于Javascript的服务器程序。

采用chrome的V8 JS理解器
共用parser，execution engine，garbage collector，js runtime（stack，memory）

不同的是：

1. Chrome是DOM API，比如console.log()
2. Node是NodeJS API，比如http.createServer()。没有document这种定义。但有console.log

## 安装和运行

安装：http://www.nodejs.org/
运行：在终端命令行里输入：node。后面可以接Javascript文件名，如：
	node hello.js
Debug：用VSCode等IDE，F5，开始debug

## 安装模块

npm: node package manager

各种包：https://www.npmjs.com/

安装：npm install package-name，会把源码下载，安装到node_modules目录下。

卸载：npm uninstall package-name

可以用package.json指定要安装的库。

## package.json

上传github时，别upload node_modules里面的内容。因为它们是可以根据package.json自动安装的。

用npm init，回答问题，自动生成package.json，包括：name，version，description，main，dependency，author，license

安装包的时候，用npm install --save express，它会往package.json里加dependency

启动程序时，用npm install，根据package.json，自动安装这些package

package.json里的scripts里，有各种可以执行的命令，可以用npm运行，比如，npm start。

## 导入模块

```JavaScript
var http = require("http");
```

## 创建HTTP server

on相当于addEventListener

1. request：收到请求。req是输入信息，res接受我们的返回。end送回response
	1. req：请求对象 request，包括了客户的请求
	2. res：响应对象 response，赋值，反馈给客户
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

然后，用浏览器访问 http://localhost:3000 就可以了。

也可以更简洁：

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

更简洁：

```JavaScript
var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
```

## 客户端请求（Query）方法

三种
1. 浏览器：只能Get
2. fetch：可以送各种请求，包括Get，Post，等。
3. curl命令行工具：curl --request PUT http://localhost:3000/hello

Fetch方法：

```js
fetch('http://localhost:3000/hello')
  .then(onResponse)
  .then(onTextReady);
```

## Get query参数

参数存在：req.query里，比如如果Query是：

http://localhost:3000/hello?name=yishuai

那么服务器收到后的req.query.name里面就存着“yishuai”。

## POST 加参数，

```js
fetch('/hello?name=yishuai',{ method: 'POST'})
  .then(onResponse)
  .then(onTextReady);
```

但一般不这么加参数，而是在request的body里送data。后面再讲。

# 练习

安装node.js：http://web.stanford.edu/class/cs193x/install-node/

## Promise + async/await的异步事件处理

两类异步事件
1. 回调函数
2. Promise：不等着。结果回来了，再接着处理

这样写出来的程序，不像普通的序列执行的代码，不好看。

```js
function onJsonReady(json) {
 console.log(json);
}
function onResponse(response) {
	return response.json();
}
fetch('albums.json')
    .then(onResponse)
    .then(onJsonReady);
```

用async，await，可以写得像序列执行似的。

await是等待一个promise。

```js
async function loadJson() {
	const response = await fetch('albums.json');
	const json = await response.json();
	console.log(json);
}
loadJson();
```

注意：
1. 构造器不能是async的。
2. node7.5后才支持async

async函数可以作为参数送给
1. addEventListener(Browser)
2. on(NodeJS)
3. get/put/delete/etc (ExpressJS)

## 模板literal

函数返回字符串，可以在字符串中加入表达式。更清晰。

如：’port ${port}", 而不是 “port ” + port

参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

## 返回json

res.json()

## 写本地文件

两个库：

1. fs：NodeJS API库，使用回调

2. fs-extra 模块，操作文件系统，npm库，使用回调或者promise

fse.writeJson(fileName, object);
