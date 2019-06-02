# Architecture

四种代码战略
1. 服务器render：模板engine
2. 单页应用：js去render
3. 组合："Isomorphic" / "Universal" （最常见）
4. Progressive Loading （未来，复杂）

## 服务器render：模板engine

利用模板，比如handlebars模板engine：http://handlebarsjs.com/

模板：
```html
<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{body}}
  </div>
</div>
```

代码
```js
const exphbs  = require('express-handlebars');

const app = express();
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
```

默认从views目录下查找模板

```js
res.render(viewname)
res.render('card', { message: doc.message, style: doc.style} );
```

## 单页应用

一个HTML，刚开始，里面所有的view是隐藏的：class=”hidden”

然后，根据URL决定要show哪个view

```js
class App {
  constructor() {
    const urlPathString = window.location.pathname;
    const parts = urlPathString.split('/');
    if (parts.length > 1 && parts[1].length > 0) {
      const word = parts[1];
      this._showWordView(word);
    } else {
      this._showSearchView();
    }
  }

  _showSearchView() {
    const viewContainer = document.querySelector('#main-view');
    const searchView = new SearchView(viewContainer);
  }

  _showWordView(word) {
    const viewContainer = document.querySelector('#word-view');
    const wordView = new WordView(viewContainer, word);
  }
}
```

# localtunnel加前端开放其它电脑访问

用localtunnel：https://github.com/localtunnel/localtunnel

npm install -g localtunnel
	-g：全局安装，只用于命令行

lt --port 3000

后台各种服务器，前台路由请求

## 定义自己的NodeJS模块

一个模块，是一个JS文件

可以用 require('./mod1.js') 直接包进去。要加.，否则会去node_modules里面去找。
https://nodejs.org/api/modules.html#modules_all_together

模块是一个特别的对象。require函数会返回JS文件中用module.exports设置的值。其它都是private的。所以，如果JS里面有全局变量的话，它会保持这个状态。比如let i = 0，然后在外面加1三次，它就会变成3。这个要注意。

练习：
simple-modules
Try loading the other modules (e.g. function-module.js) by changing the require statement in scripts.js.

参考：https://nodejs.org/api/modules.html#modules_the_module_object

## 中间件：路由

把JSON API请求，独立出来，作为一个中间件（Middleware）

定义Middleware函数，三个参数：req，res，next

如果res.send, res.json，就不必call next了。

app.get
app.use

### 定义Router对象

在api.js里定义，并导出router

```js
const express = require('express');
const router = express.Router();

async function onLookupWord(req, res) {
router.get('/lookup/:word', onLookupWord);

module.exports = router;
}

在server.js里用app.use(router)用这个route。
```

### 加参数

如果中间件里要访问MongoDB，可以给req加新属性，把collection给它，在后面的Middleware里就能访问collection了。

## 参考材料

- Router： https://expressjs.com/en/4x/api.html#router
- Writing / Using Middleware，
  - https://expressjs.com/en/guide/writing-middleware.html，
	- https://expressjs.com/en/guide/using-middleware.html
