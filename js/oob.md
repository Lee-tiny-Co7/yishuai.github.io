# 面向对象编程

所有的都是对象。

Almost everything is an object. Objects as unordered maps. Object creation, modification and lookup syntax. Nested objects. Object methods. The delete keyword. The for... in statement, and the hasOwnProperty method. The global window object. Object references. Aliasing. Pass-by-reference-copy semantics.

复合结构，一组数据

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

加新属性
```JavaScript
var student = {
	"name": "Jane Doe",
	"class": 2015
};

student.age = 14;
console.log(student);
```

删属性
```JavaScript
delete student.class;
console.log(student);
```

读写
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

遍历对象的属性
注意；对数组，不能用 for in，而是要用for of
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

顺序不确定。

hasOwnProperty确保不会访问后面prototype chain定义的属性。

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

ES6的类继承
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

# JSON

通信

```JavaScript
var obj = { ps: 'str', pn: 1, pa: [1,'two',3,4], po: { sop: 1}};
var s = JSON.stringify(obj) = '{"ps":"str","pn":1,"pa":[1,"two",3,4],"po":{"sop":1}}'
typeof s == 'string'
JSON.parse(s)
```
