
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

## Web微框架：Express
npm install express
```JavaScript
var express = require("express");		# load模块
var app = express();								# 创建应用
app.get("/", function(req, res) {		# 定义route，仅处理Get “/”的
	res.send("Hello world!");
	res.end();
}).listen(1337);										# 开始侦听
console.log('Server running at http://127.0.0.1:1337/');
```

## Route

```JavaScript
var express = require("express");
var app = express();

app.get("/hello", function(req, res) {
	res.send("Hello!");
	res.end();
});

app.get("/world", function(req, res) {
	res.send("World!");
	res.end();
});

app.listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
```

## 参数

运行下面代码，然后在浏览器访问http://127.0.0.1:1337/?name=John
```JavaScript
var express = require("express");
var app = express();
app.get("/", function(req, res) {
	res.send("Hello, " + req.query.name + "!");
	res.end();
}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
```

## 静态文件

使用public作为默认目录，如果其他route没有匹配上，就在这里找静态文件
在目录public下创建一个hello.html文件
运行下面代码，然后在浏览器访问http://127.0.0.1:1337/hello.html
```JavaScript
var express = require("express");
var ejs = require("ejs");
app.use(express.static(__dirname + "/public"));			
app.listen(1337);
```

## View
指定模板，动态填充内容
set选定ejs作为模板引擎
render将数据greeting送入模板hello.ejs

```JavaScript
var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", function(req, res) {
	res.render("hello", {"greeting": Hello world!});
}).listen(1337);

console.log('Server running at http://127.0.0.1:1337/');
```

hello.ejs文件内容如下，其中 <%= greet %> 是需要替换的模板内容。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Hello World</title>
	</head>
	<body>
		<h1><%= greet %></h1>
	</body>
</html>

```

# Ajax

AJAX. Asynchronous communication. Callback functions. The get and post formats. Same-origin policy. Cross-origin requests with JSONP. AJAX polling. (Flanagan Chapter 18，19)

```JavaScript
var request = new XMLHttpRequest();
request.open("GET","data.csv");
request.setRequestHeader("Content-Type", "text/plain");
request.send(null)
```

## jQuery Ajax
1. load
2. get, post

```JavaScript
jQuery.get("debug.txt",alert);
```
