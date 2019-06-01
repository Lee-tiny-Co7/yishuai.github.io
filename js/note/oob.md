# 面向对象编程

所有的都是对象。

Almost everything is an object. Objects as unordered maps. Object creation, modification and lookup syntax. Nested objects. Object methods. The delete keyword. The for... in statement, and the hasOwnProperty method. The global window object. Object references. Aliasing. Pass-by-reference-copy semantics.

复合结构，一组数据

两种定义方法：
1. 函数
2. Class

## 声明

```JavaScript
var student = {
	"name": "Jane Doe",
	"class": 2015
};

var ninja = {
	weapon: 'katana',
	skill: 'stealth'
};
```

## 加新属性

赋值，就自动加了新属性

```JavaScript
var student = {
	"name": "Jane Doe",
	"class": 2015
};

student.age = 14;
console.log(student);
```

## 删属性

delete

```JavaScript
delete student.class;
console.log(student);
```

## 读写
```JavaScript
student.class = 2014;

console.log('Name:', student.name);
console.log('Class:', student.class);

console.log('Weapon:', ninja["weapon"]);
console.log('Skill:', ninja["skill"]);
```

访问未定义的对象属性，不出错，只是返回undefined
```JavaScript
var ninja = {
	weapon: 'katana',
	skill: 'stealth'
};

console.log(ninja.email);  // Not an error
console.log(ninja["email"]);  // Not an error
```

## 遍历对象的属性

for in，顺序不确定。

注意；对数组，不能用 for in，而是要用for of

hasOwnProperty确保不会访问后面prototype chain定义的属性。

```JavaScript

Object.keys({name: "Alice", age: 23}) = ["name", "age"]

for (key in student) {
	if (student.hasOwnProperty(key)) {
		console.log(key + ": " + student[key]);
	}
}

for (let name in scores) {
	console.log(name + ' got ' + scores[name]);
}
```

## 一切都是对象

除了null，undefined，其它一切都是对象，可以用.来进行函数调用。

```JavaScript
console.log(true.toString());
console.log("Hello world!".toString());
console.log([1, 2, 3].toString());
console.log({"hi": "there"}.toString());
```

但数字后面加.会被认为是小数点，所以要加()。{}也是。
```JavaScript
console.log(0.toString());
console.log(function() {}.toString());

console.log((0).toString());
console.log((function() {}).toString());

console.log("Hey Jude".indexOf("Jude"));
console.log((42).toString());
```

对一个primitive来说（即number, string, boolean, null, undefined），JS会动态生成一个对象，执行完操作后，对象删除。所以不能往里面加新属性等。

```JavaScript
var myNum = 42;
myNum.answerTo = "Life, The Universe and Everything";
console.log(myNum.answerTo);
```

访问一个可能没有定义的对象属性
```JavaScript
var prop = obj && obj.propname;
```

## this

指向自己

```JavaScript
var obj = {count: 0};
obj.increment = function (amount) {
	this.count += amount;
	return this.count;
}

obj.increment(1);  // returns 1
obj.increment(3);  // returns 4
```

下面这样是错的，因为this被函数重设了
```JavaScript
fs.readFile(this.fileName + fileNo, function (err, data) {
	console.log(this.fileName, fileNo); // Wrong!
});

```

这是对的，先把this存起来
```JavaScript
var self = this;
fs.readFile(self.fileName + fileNo, function (err, data) {
   console.log(self.fileName,fileNo);
});
```

这是对的，因为箭头不改变this
```JavaScript
fs.readFile(this.fileName + fileNo, (err, data) =>
       console.log(this.fileName,fileNo)
);
```

## 函数就是类

函数就是类

```JavaScript
function Rectangle(width, height) {
   this.width = width;
   this.height = height;
   this.area = function() { return this.width*this.height; }
}
var r = new Rectangle(26, 14); // {width: 26, height: 14}

r.constructor.name == 'Rectangle'		// 构造器
console.log(r)	// Rectangle { width: 26, height: 14, area: [Function] }
```

可以有属性

```JavaScript
function plus1(value) {
    if (plus1.invocations == undefined) {
        plus1.invocations = 0;
    }
    plus1.invocations++;
    return value + 1;
}
```

## 继承

通过prototype链来实现。声明一个函数要继承什么。比如下面的area是Rectangle继承来的，不是它自己的属性：
```JavaScript
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}
Rectangle.prototype.area = function() {
   return this.width*this.height;
}

var r = new Rectangle(26, 14); // {width: 26, height: 14}

var v = r.area(); // v == 26*14

Object.keys(r) == [ 'width', 'height' ] // own properties
```

下面两句话是不同的：分别是给对象加方法（instances）和继承（prototype）

```JavaScript
r.newMethod = function() { console.log('New Method called'); }

Rectangle.prototype.newMethod =
       function() { console.log('New Method called'); }
```

继承：如果在Rectangle.prototyp中找不到一个属性，就会去Shape.prototype里找。
```JavaScript
Rectangle.prototype = new Shape(...);
```

## Class

Public methods
1. 构造器是可选的。
2. 里面的函数不需要function关键字
3. 在class里，必须用this引用其它函数
4. 所有的方法是public的，不能定义private

Public fields
1. 用this.定义的就是public fileld。在constructor里定义的是，在其它函数里定义的也是。
2. 定义后，在class里，得用this.引用它。

Instantiation

```JavaScript
class ClassName{
  constructor(){
	}
	methodName() {
		this.methodTwo();
	}
	methodTwo() {
	}
}
```

### 类里的this

this是动态assign的，在不同的context里，意味着不同的东西：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
1. 在构造器constructor里，this指的是这个类的instance
2. 在event handler里，this指的是这个event handler attach的元素。

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#As_a_DOM_event_handler

注意：java的this不同。它总是指向instance的。

解决办法：可以用bind，把类里函数中的this总是指向instance对象
1. 生成一个函数的拷贝，其中this总是指向一个值
2. 把这个值bind到新对象上。所以this就总是指向这个对象了。而不是调用这个函数的html元素了。

```js
this.method = this.method.bind(this);
```

### 练习：

把非对象的”礼物“”网页，改成面向对象的：
1. 非对象的：https://codepen.io/bee-arcade/pen/db0b3223fd87ed06051aa1f2abf5ec63?editors=1010
2. 面向对象的：
	1. 初始代码：https://codepen.io/bee-arcade/project/editor/ZmgkzA
	2. 完成后代码：https://codepen.io/bee-arcade/project/editor/DkmRVX
	3. 把image作为对象属性，this bind的代码：https://codepen.io/bee-arcade/project/editor/ZBEqmD

面向对象的一个好处，是这个对象可以重用。

练习：修改代码，显示两个礼物。

### ES6的类继承

```JavaScript
class Rectangle extends Shape { // Definition and Inheritance
	constructor(height, width) {
		super(height, width);
		this.height = height;
		this.width = width;
	}
	area() {	 // Method definition
		return this.width * this.height;
	}
	static countRects() {
		...
	}
}
var r = new Rectangle(10,20);
```

React.js继承
```JavaScript
class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    ...
	}
	render() {
	    return (
	      <div>Hello World</div>
			);
	}
}
```

# 类间通信

## 练习

5个礼物的例子：https://codepen.io/bee-arcade/project/editor/XaxgOZ
里面有两个类：App，Present

修改这个例子，当所有礼物都打开了，就来一句祝贺！ https://codepen.io/bee-arcade/project/editor/DvzqmD

两种方法

1. 定制一个event，在类间通信：https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events

```js
const event = new CustomEvent(
	 ename, optionalpara
);

element.addEventListener(ename);

element.dispatchEvent(optionalpara);
```

例：https://codepen.io/bee-arcade/project/editor/AQPekX

但是，定制的event只能被html元素监听和dispatch，不能给任意的类instance。所以，present不能给app类发。

https://codepen.io/bee-arcade/project/editor/DWBKqA

```js
App
	document.addEventListener('present-opened', this._onPresentOpened);
Present
	document.dispatchEvent(new CustomEvent('present-opened'));
```

解决办法：bind
```js
App
	this._onPresentOpened = this._onPresentOpened.bind(this);

```
2. 加一个onOpened回调函数给Present

App构造Presents时，给它自己的PresentOpened函数。
Present被打开后，fire这个函数。
注意要bind

结果：https://codepen.io/bee-arcade/project/editor/XqGzeD

示例：Pizza的面向对象版本

https://codepen.io/bee-arcade/project/editor/AbJmLA/#

## 如何选择“类”

每一个元素，一个类：attach，remove event listener.

React用这种方法

## 示例

三个按钮，按了后，更新h1
示例：https://codepen.io/bee-arcade/live/b0ae765cc6ccf3187c03afda2b2e085c

创建Button类
https://codepen.io/bee-arcade/pen/713c9d676251dd8f43b13ca8cf2df160?editors=1010

```js
class Button {
  constructor(containerElement, text) {
    this.containerElement = containerElement;
    const button = document.createElement('button');
    button.textContent = text;
    this.containerElement.append(button);
  }
}

const buttonContainer = document.querySelector('#menu');
const button1 = new Button(buttonContainer, 'A');
const button2 = new Button(buttonContainer, 'B');
const button3 = new Button(buttonContainer, 'C');
```

加点击响应函数

第一次尝试
https://codepen.io/bee-arcade/pen/8d2f166e69166dc9af1051f64437c959
不成功。this指向的是button那个html element，不是button这个对象。但onClick函数是Button这个类的。

需要bind
https://codepen.io/bee-arcade/pen/3635971ec4c5a8caa97d262922e5bc89

OO写法，两个类：

1. 菜单类：包括三个按钮，它初始化的时候，生成这三个按钮：
https://codepen.io/bee-arcade/pen/dbd02b9a9301acb969af0fa749168994

2. 按钮类：每个按钮，画图，处理

类间通信的两种方法：

1. 按钮被按了以后，发一个’button-click”给菜单。菜单收到后，更新Header。注意bind
https://codepen.io/bee-arcade/pen/2b5ab50df0f693ad81e6816f190439e8?editors=0010
但显示的是Null is clicked
因为我们加的定制event是给document的，所以event.currentTarget是document

改进：把buttonName作为参数，也发给菜单。
https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#Adding_custom_data_%E2%80%93_CustomEvent()

```js
onClick() {
	const eventInfo = {
		buttonName: this.text
	};
	document.dispatchEvent(
			new CustomEvent('button-clicked', { detail: eventInfo }));
}
```
最终的效果：
https://codepen.io/bee-arcade/pen/b0ae765cc6ccf3187c03afda2b2e085c?editors=0010

2. 利用回调函数

整理一下思想：函数也是一个对象。只是它的类型是Function而已。
它有name，toString这些属性
还有一个很特别的call()方法，用来执行它。用()操作符进行调用。

可以把函数作为属性，赋给对象：
https://codepen.io/bee-arcade/pen/107883c371bffa2d73ba1299becf1d38?editors=1011

```js
function sayHello() {
  console.log('Ice Bear says hello');
}

const bear = {
  name: 'Ice Bear',
  hobbies: ['knitting', 'cooking', 'dancing'],
  greeting: sayHello
};
bear.greeting();
```

既然函数是对象，就可以作为函数的参数，传递给eventListener。

练习：https://codepen.io/bee-arcade/pen/cff88343de4655069e157f094cccf247?editors=0011

```js
function greetings(greeterFunction) {
  greeterFunction();
}

const worldGreeting = function() {
  console.log('hello world');
};

const hawaiianGreeting = () => {
  console.log('aloha');
};

greetings(worldGreeting);
greetings(hawaiianGreeting);
```

this指向函数的调用者
https://codepen.io/bee-arcade/pen/b0c1f3c17814ba31d99c1e72a46b46e2?editors=1011

```js
function sayHello() {
  console.log(this.name + ' says hello');
}

const bear = {
  name: 'Ice Bear',
  hobbies: ['knitting', 'cooking', 'dancing'],
  greeting: sayHello
};
bear.greeting();

const mario = {
  name: 'Mario',
  helloFunction: bear.greeting
};
mario.helloFunction();
```

示例：如果我们点按钮，会出来什么？
https://codepen.io/bee-arcade/pen/d214bea753753099d49774157b98a71b?editors=0011

```js
const bear = {
  characterName: 'Ice Bear',
  hobbies: ['knitting', 'cooking', 'dancing'],
  greeting: function() {
     console.log(this.characterName + ' says hello');
  }
}
bear.greeting();

const button = document.querySelector('button');
button.addEventListener('click', bear.greeting);
```

后一个的this是指向button的。它没有characterName属性，所以是undefined。

加bind：练习

练习：
button的例子，
yishuai.github.io/js/exercise/斯坦福/10-js-oo/7-oo/button.html
Menu更新status bar，它把自己更新status bar的函数showButtonClicked，送给button。
button用addEventListener加了一个侦听器，两个参数：听什么（click），回调函数（onClick）。
就像给这个按钮装了一个报警器，如果有人click，它就会立刻启动onClick函数，干活（比如“放狗”）
在这里，button被点击后，会在自己的onClick里，调用它，从而修改status bar。

# JSON

通信

```JavaScript
var obj = { ps: 'str', pn: 1, pa: [1,'two',3,4], po: { sop: 1}};
var s = JSON.stringify(obj) = '{"ps":"str","pn":1,"pa":[1,"two",3,4],"po":{"sop":1}}'
typeof s == 'string'
JSON.parse(s)
```
