# Express

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

# ExpressJS
语法： app.method(path, handler)

Express routes

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/hello', (req, res) => res.send('POST World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

http://localhost:3000/hello

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

route参数：

### 用?标识，会在req.query里.

运行下面代码，然后在浏览器访问http://127.0.0.1:1337/?name=John&type=movie

```JavaScript
var express = require("express");
var app = express();
app.get("/", function(req, res) {
	res.send("Hello, " + req.query.name + " like " + req.query.type + "!");
	res.end();
}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
```

app.get('')

### 用:标识，会在req.params里.

https://expressjs.com/en/guide/routing.html

运行下面代码，然后在浏览器访问http://127.0.0.1:1337/hello/yishuai

```JavaScript
app.get("/hello/:name", function(req, res) {
	res.send("Hello, " + req.params.name + "!");
});
```

可以有多个Route参数

运行下面代码，然后在浏览器访问http://127.0.0.1:1337/hello/yishuai-yongxiang

```JavaScript
app.get("/hello/:from-:to", function(req, res) {
	res.send("Hello, " + req.params.from + " to " + req.params.to);
});
```

https://expressjs.com/en/guide/routing.html

## 用body送数据到服务器

用query参数送数据，不好。放到message的body里。

```js
const message = {
  name: 'Victoria',
  email: 'vrk@stanford.edu'
};
const fetchOptions = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(message)
};
fetch('/helloemail', fetchOptions)
  .then(onResponse)
  .then(onTextReady);
```

## 服务器解析

自己解析比较麻烦

```js
app.post('/helloemail', function (req, res) {
  let data = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
     data += chunk;
  });

  req.on('end', function() {
    const body = JSON.parse(data);
    const name = body.name;
    const email = body.email;
    res.send('POST: Name: ' + name + ', email: ' + email);
  });
});
```

用body-parser库解析。

先npm安装

解析后结果存在req.body里

```js
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.post('/helloparsed', jsonParser, function (req, res) {
  const body = req.body;
  const name = body.name;
  const email = body.email;
  res.send('POST: Name: ' + name + ', email: ' + email);
});
```

## 推荐使用方法

仅建议，不强制，可不遵守。

方法
1. 读数据，用get
2. 写数据，用post。更新数据，用patch。删除数据，用delete

参数
1. 必须的参数：用route parameter，/
2. 可选参数、值有空格的参数：用query parameter，？

## Public目录，提供静态文件

使用public作为默认目录：如果其他route没有匹配上，就在这里找静态文件

在目录public下创建一个hello.html文件

运行下面代码，然后在浏览器访问http://127.0.0.1:1337/hello.html

作为文件提供服务，而不是API

```JavaScript
var express = require("express");
var ejs = require("ejs");

app.use(express.static(__dirname + "/public"));			
// app.use(express.static('public'))

app.listen(1337);
```

## View：模板

指定模板，动态填充内容

### Handlebars模板引擎

const exphbs  = require('express-handlebars');
...
const app = express();
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

layout

### ejs模板引擎

作为模板的hello.ejs文件内容如下，其中 <%= greet %> 是需要替换的模板内容。

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

## 允许跨域访问（CORS）

```js
res.header('Access-Control-Allow-Origin', '*');
```
