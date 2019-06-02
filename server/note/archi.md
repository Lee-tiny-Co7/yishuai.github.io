# Architecture

四种战略

1. 服务器render：模板engine
2. 单页应用：js去render
3. 组合："Isomorphic" / "Universal" （最常见）
4. Progressive Loading （未来，复杂）

## 服务器render：模板engine

handlebars模板engine
http://handlebarsjs.com/

```html
<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{body}}
  </div>
</div>
```

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

2. 单页应用

首先，所有的view是隐藏的：class=”hidden”

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

练习：mongodb-example

实战

https://glitch.com/edit/#!/purple-paladin
https://glitch.com/edit/#!/fuschia-custard
https://glitch.com/edit/#!/thread-paper
https://glitch.com/edit/#!/dandelion-roar
https://glitch.com/edit/#!/curse-arrow
https://glitch.com/edit/#!/hard-twilight
https://glitch.com/edit/#!/protective-garage
https://glitch.com/edit/#!/spark-cathedral
https://glitch.com/edit/#!/giant-chronometer
https://glitch.com/edit/#!/horn-celery

https://learn.freecodecamp.one/coding-interview-prep/take-home-projects

https://www.cnblogs.com/zhongweiv/p/mongoose.html
https://mongoosejs.com/docs/
