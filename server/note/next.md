# General advice

和厉害的人一起工作。进步最快。

Recommended CS classes:
- Databases
- As many systems classes as you can take
  - CS 107 and 110
  - Networking
  - Operating Systems
- Compilers
- Programming languages

# 鲁棒性

服务器端要非常非常小心

```js
// A: Deletes the specified document (or // does nothing if not found).
const query = { _id: ObjectID(id) }; userData.deleteOne(query);

// B: Deletes the first document.
const query = { };
userData.deleteOne(query);
```

# 做测试

要做测试：

1. https://en.wikipedia.org/wiki/Unit_testing
2. https://en.wikipedia.org/wiki/Software_regression

三种测试工具
- MochaJS: A popular JavaScript test framework that works on frontend and backend (NodeJS) code，https://mochajs.org/
- Jest: Facebook's JS test framework，https://facebook.github.io/jest/
- Chai: Helper library to write easier-to-read tests，http://chaijs.com/，Used with Mocha, Jest, etc

# Module bundlers

在HTML中包括大量的js，很难维护。顺序可能关键。

## browserify
http://browserify.org/ ：在前端也用require，编译为一个script.js

步骤：
- $ sudo npm install -g browserify
- $ browserify js/* -o js/bundle.js
- 把bundle.js包括进HTML

## webpack

https://webpack.github.io/

# 老浏览器支持

用babel
1. http://babeljs.io/
2. http://babeljs.io/docs/setup/#installation
3. https://babeljs.io/en/repl

和WebPack一起用：

$ browserify script.js -t babelify -o bundle.js

# 类型检查

三种对类型检查的增强方案
1. 微软Typescript，http://www.typescriptlang.org/index.html
2. Facebook Flow，https://flow.org/
3. Google closure，https://developers.google.com/closure/compiler/，加在注释里

# 可接入性

针对残疾人

参考文献：
- https://developer.mozilla.org/en-US/docs/Web/Accessibility
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
- https://www.google.com/accessibility/
- http://teachaccess.org/
- https://teachaccess.github.io/tutorial/#/3
- https://www.udacity.com/course/web-accessibility--ud891
- https://chrome.google.com/webstore/detail/accessibility-developer-t/- fpkknkljclfencbdbgkenhalefipecmb?hl=en

# websocket
参考文献
- https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
- https://socket.io/

# css grid

http://caniuse.com/#feat=css-grid

# 网上的信息

Do not trust:
- Comment sections of Reddit
- Comment sections of Hacker News
- Comment sections of any website
- Medium articles by randos

Usually works, but sometimes poor style / not best practice
- StackOverflow answers
- W3C schools
- Programming YouTube videos

Better opinions than most, but sometimes still trash
- Quora answers

Reliable websites
- Google Web Fundamentals
  https://developers.google.com/web/fundamentals/
- Mozilla hacks
  https://hacks.mozilla.org/

Prominent JavaScript accounts/people on Twitter, e.g.
- NodeJS, Sarah Drasner, Suz Hinton, Sebastian
Markbåge, Henry Zhu, Dan Abramov, David Walsh
- https://twitter.com/nodejs
- https://twitter.com/sarah_edo
- https://twitter.com/noopkat
- https://twitter.com/sebmarkbage
- https://twitter.com/left_pad
- https://twitter.com/dan_abramov
- https://twitter.com/davidwalshblog

Official documentation:
- HTML WHATWG spec / HTML W3C spec，https://html.spec.whatwg.org/，https://www.w3.org/TR/html5/

- EcmaScript status / spec
  https://github.com/tc39/ecma262，https://tc39.github.io/ecma262/

The only way to get better at web programming is to write lots and lots of code.
 - Become a software engineer
 - Work with software engineers who are better than you
 - Write simple side projects to learn new tech
 - Suggestion: Choose a project you know you could
 finish in 1 day - 1 week